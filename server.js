const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customers');

dotenv.config();

const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// データベース接続
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDBに接続しました'))
.catch(err => console.error('MongoDB接続エラー:', err));

// ルート
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CMS API サーバーが稼働中です' });
});

// サーバー起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
}); 
