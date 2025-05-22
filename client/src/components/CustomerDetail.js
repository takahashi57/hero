import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchCustomer = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setCustomer(response.data);
      setLoading(false);
    } catch (err) {
      setError('顧客データの取得に失敗しました');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      navigate('/');
    } catch (err) {
      setError('削除に失敗しました');
      setDeleting(false);
      setDeleteDialogOpen(false);
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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            一覧に戻る
          </Button>
          <Typography variant="h5" gutterBottom>
            顧客詳細情報
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/customer/${id}/edit`)}
          >
            編集
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            disabled={deleting}
          >
            削除
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            基本情報
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              ステータス
            </Typography>
            <Chip
              label={customer.status}
              color={customer.status === '未対応' ? 'warning' : 'error'}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              配信日時
            </Typography>
            <Typography>
              {new Date(customer.deliveryDate).toLocaleString('ja-JP')}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              顧客名
            </Typography>
            <Typography>
              {customer.name} ({customer.nameKana})
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              連絡先
            </Typography>
            <Typography>
              {customer.email}
              <br />
              {customer.phone}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              住所
            </Typography>
            <Typography>
              〒{customer.postalCode}
              <br />
              {customer.address}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            商品情報
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              ブランド
            </Typography>
            <Typography>{customer.brand}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              アイテム
            </Typography>
            <Typography>{customer.item}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              型番
            </Typography>
            <Typography>{customer.modelNumber || '未設定'}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              商品の状態
            </Typography>
            <Typography>{customer.condition}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              購入時期
            </Typography>
            <Typography>{customer.purchasePeriod}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              付属品
            </Typography>
            <Box sx={{ mt: 1 }}>
              {customer.accessories && customer.accessories.length > 0 ? (
                customer.accessories.map((accessory, index) => (
                  <Chip
                    key={index}
                    label={accessory}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))
              ) : (
                <Typography>なし</Typography>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" color="text.secondary">
            備考・要望
          </Typography>
          <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
            {customer.notes || '特になし'}
          </Typography>
        </Grid>

        {customer.memo && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" color="text.secondary">
              メモ
            </Typography>
            <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
              {customer.memo}
            </Typography>
          </Grid>
        )}
      </Grid>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        customerName={customer?.name}
      />
    </Paper>
  );
};

export default CustomerDetail; 
