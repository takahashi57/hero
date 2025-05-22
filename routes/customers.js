const express = require('express');
const router = express.Router();
const multer = require('multer');
const { parse } = require('csv-parse');
const fs = require('fs');
const Customer = require('../models/Customer');

// ファイルアップロードの設定
const upload = multer({ dest: 'uploads/' });

// CSVファイルのアップロードと処理
router.post('/import', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'ファイルがアップロードされていません' });
  }

  const results = [];
  const errors = [];

  fs.createReadStream(req.file.path)
    .pipe(parse({ 
      columns: true, 
      trim: true,
      skip_empty_lines: true,
      from_line: 2 // ヘッダー行をスキップ
    }))
    .on('data', async (data) => {
      try {
        // 日付の変換
        const deliveryDate = new Date(data['配信日時'].replace('年', '-').replace('月', '-').replace('日', '').replace('時', ':').replace('分', ''));

        // 付属品の処理
        const accessories = data['付属品'] ? data['付属品'].split(',').map(item => item.trim()) : [];

        const customer = new Customer({
          userId: data['ユーザーID'],
          applicationId: data['申し込みID'],
          status: data['進捗'],
          deliveryDate: deliveryDate,
          brand: data['ブランド'],
          item: data['アイテム'],
          modelNumber: data['型番'],
          hasAccessories: data['付属品の有無'] === 'あり',
          accessories: accessories,
          condition: data['商品の状態'],
          purchasePeriod: data['購入時期'],
          name: data['氏名'],
          nameKana: data['ふりがな'],
          email: data['メールアドレス'],
          postalCode: data['郵便番号'],
          address: data['住所'],
          phone: data['電話番号'],
          notes: data['備考・要望など'],
          denialStatus: data['否認ステータス'],
          appraisalAmount: data['査定金額'] ? parseInt(data['査定金額']) : null,
          memo: data['メモ'],
          hasPhotos: data['写真添付の有無'] === 'あり'
        });

        await customer.save();
        results.push(customer);
      } catch (error) {
        errors.push({ data, error: error.message });
      }
    })
    .on('end', () => {
      // 一時ファイルの削除
      fs.unlinkSync(req.file.path);
      res.json({
        message: 'インポートが完了しました',
        imported: results.length,
        errors: errors.length,
        errorDetails: errors
      });
    })
    .on('error', (error) => {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ message: 'ファイルの処理中にエラーが発生しました', error: error.message });
    });
});

// 顧客一覧の取得
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ deliveryDate: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: '顧客データの取得に失敗しました', error: error.message });
  }
});

// 顧客の詳細取得
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: '顧客が見つかりません' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: '顧客データの取得に失敗しました', error: error.message });
  }
});

// 顧客情報の更新
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ message: '顧客が見つかりません' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: '顧客データの更新に失敗しました', error: error.message });
  }
});

// 顧客の削除
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: '顧客が見つかりません' });
    }
    res.json({ message: '顧客を削除しました' });
  } catch (error) {
    res.status(500).json({ message: '顧客データの削除に失敗しました', error: error.message });
  }
});

module.exports = router; 
