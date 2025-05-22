import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setCustomer(response.data);
      setLoading(false);
    } catch (err) {
      setError('顧客データの取得に失敗しました');
      setLoading(false);
    }
  };

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
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, customer);
      navigate(`/customer/${id}`);
    } catch (err) {
      setError('更新に失敗しました');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !customer) {
    return (
      <Typography color="error" align="center">
        {error || '顧客が見つかりません'}
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/customer/${id}`)}
          sx={{ mb: 2 }}
        >
          詳細に戻る
        </Button>
        <Typography variant="h5" gutterBottom>
          顧客情報の編集
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              基本情報
            </Typography>
            
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
            />

            <TextField
              fullWidth
              label="顧客名（カナ）"
              name="nameKana"
              value={customer.nameKana}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="メールアドレス"
              name="email"
              value={customer.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="電話番号"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="郵便番号"
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
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
            />

            <TextField
              fullWidth
              label="アイテム"
              name="item"
              value={customer.item}
              onChange={handleChange}
              sx={{ mb: 2 }}
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
              >
                <MenuItem value="新品">新品</MenuItem>
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
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
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
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/customer/${id}`)}
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

export default CustomerEdit; 