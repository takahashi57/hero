import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    userId: '',
    applicationId: '',
    status: '未対応',
    deliveryDate: new Date().toISOString().slice(0, 16),
    brand: '',
    item: '',
    modelNumber: '',
    hasAccessories: false,
    accessories: [],
    condition: '新品',
    purchasePeriod: '',
    name: '',
    nameKana: '',
    email: '',
    postalCode: '',
    address: '',
    phone: '',
    notes: '',
    denialStatus: '',
    appraisalAmount: '',
    memo: '',
    hasPhotos: false,
  });

const [error, setError] = useState('');
const [saving, setSaving] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value

    }));
  };

  const handleAccessoriesChange = (event) => {
    const {
      target: { value },
    } = event;

    setCustomer(prev => ({

      ...prev,
      accessories: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // 必須フィールドのバリデーション
    const requiredFields = [
      'userId',
      'applicationId',
      'deliveryDate',
      'brand',
      'item',
      'condition',
      'purchasePeriod',
      'name',
      'nameKana',
      'email',
      'postalCode',
      'address',
      'phone'
    ];
    const missingFields = requiredFields.filter(field => !customer[field]);
    
    if (missingFields.length > 0) {
      setError(`以下の項目は必須です: ${missingFields.join(', ')}`);
      setSaving(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/customers', customer);
      navigate(`/customer/${response.data._id}`);
    } catch (err) {
      console.error('顧客作成エラー:', err);
      const errorMessage = err.response?.data?.message || '作成に失敗しました';
      const errorDetails = err.response?.data?.details || {};
      setError(`${errorMessage}${Object.keys(errorDetails).length ? ': ' + JSON.stringify(errorDetails) : ''}`);
      setSaving(false);
    }
  };


  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            一覧に戻る
          </Button>
          <Typography variant="h5" gutterBottom>
            顧客情報の追加
          </Typography>
        </Box>
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          一覧に戻る
        </Button>
        <Typography variant="h5" gutterBottom>
          顧客情報の追加
        </Typography>
      </Box>


      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              基本情報
            </Typography>

<TextField
  fullWidth
  label="ユーザーID"
  name="userId"
  value={customer.userId}
  onChange={handleChange}
  sx={{ mb: 2 }}
  required
/>

<TextField
  fullWidth
  label="申し込みID"
  name="applicationId"
  value={customer.applicationId}
  onChange={handleChange}
  sx={{ mb: 2 }}
  required
/>

<TextField
  fullWidth
  label="配信日時"
  type="datetime-local"
  name="deliveryDate"
  value={customer.deliveryDate}
  onChange={handleChange}
  sx={{ mb: 2 }}
  InputLabelProps={{ shrink: true }}
  required
/>

            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>ステータス</InputLabel>
              <Select
                name="status"
                value={customer.status}
                onChange={handleChange}
                label="ステータス"
              >

                <MenuItem value="未対応">未対応</MenuItem>
                <MenuItem value="対応済み">対応済み</MenuItem>
                <MenuItem value="ロスト">ロスト</MenuItem>
              </Select>
            </FormControl>


            <TextField
              fullWidth
              label="顧客名"
              name="name"
              value={customer.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="顧客名（カナ）"
              name="nameKana"
              value={customer.nameKana}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="メールアドレス"
              name="email"
              value={customer.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="電話番号"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="郵便番号"
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="住所"
              name="address"
              value={customer.address}
              onChange={handleChange}
              multiline
              rows={2}
              sx={{ mb: 2 }}
              required
            />
          </Grid>


          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              商品情報
            </Typography>


            <TextField
              fullWidth
              label="ブランド"
              name="brand"
              value={customer.brand}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="アイテム"
              name="item"
              value={customer.item}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="型番"
              name="modelNumber"
              value={customer.modelNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>商品の状態</InputLabel>
              <Select
                name="condition"
                value={customer.condition}
                onChange={handleChange}
                label="商品の状態"
                required
              >
                <MenuItem value="新品">新品</MenuItem>
                <MenuItem value="美品">美品</MenuItem>
                <MenuItem value="中古品">中古品</MenuItem>
                <MenuItem value="中古">中古</MenuItem>
                <MenuItem value="未使用">未使用</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="購入時期"
              name="purchasePeriod"
              value={customer.purchasePeriod}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>付属品の有無</InputLabel>
  <Select
    name="hasAccessories"
    value={customer.hasAccessories ? 'あり' : 'なし'}
    onChange={(e) =>
      setCustomer(prev => ({ ...prev, hasAccessories: e.target.value === 'あり' }))
    }
    label="付属品の有無"
  >
    <MenuItem value="あり">あり</MenuItem>
    <MenuItem value="なし">なし</MenuItem>
  </Select>
</FormControl>

              <InputLabel>付属品</InputLabel>
              <Select
                multiple
                value={customer.accessories || []}

                onChange={handleAccessoriesChange}
                input={<OutlinedInput label="付属品" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="箱">箱</MenuItem>
                <MenuItem value="保証書">保証書</MenuItem>
                <MenuItem value="説明書">説明書</MenuItem>
                <MenuItem value="付属ケーブル">付属ケーブル</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="備考・要望"
              name="notes"
              value={customer.notes}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="メモ"
              name="memo"
              value={customer.memo}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>否認ステータス</InputLabel>
  <Select
    name="denialStatus"
    value={customer.denialStatus}
    onChange={handleChange}
    label="否認ステータス"
  >
    <MenuItem value="">なし</MenuItem>
    <MenuItem value="否認">否認</MenuItem>
  </Select>
</FormControl>

<TextField
  fullWidth
  label="査定金額"
  name="appraisalAmount"
  type="number"
  value={customer.appraisalAmount}
  onChange={handleChange}
  sx={{ mb: 2 }}
/>

<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>写真添付の有無</InputLabel>
  <Select
    name="hasPhotos"
    value={customer.hasPhotos ? 'あり' : 'なし'}
    onChange={(e) =>
      setCustomer(prev => ({ ...prev, hasPhotos: e.target.value === 'あり' }))
    }
    label="写真添付の有無"
  >
    <MenuItem value="あり">あり</MenuItem>
    <MenuItem value="なし">なし</MenuItem>
  </Select>
</FormControl>

          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
              >

                {saving ? '保存中...' : '保存'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CustomerCreate;
