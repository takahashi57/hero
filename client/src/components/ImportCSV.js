import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import axios from 'axios';

const ImportCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('CSVファイルを選択してください');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('ファイルを選択してください');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/customers/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(`インポートが完了しました。${response.data.imported}件のデータをインポートしました。`);
      setFile(null);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'インポート中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        CSVファイルのインポート
      </Typography>
      <Box sx={{ mt: 2 }}>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="csv-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="csv-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
            disabled={loading}
          >
            ファイルを選択
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            選択されたファイル: {file.name}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'アップロード'}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Paper>
  );
};

export default ImportCSV; 