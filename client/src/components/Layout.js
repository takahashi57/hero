import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { Upload as UploadIcon, List as ListIcon } from '@mui/icons-material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            顧客管理システム
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<ListIcon />}
          >
            顧客一覧
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/import"
            startIcon={<UploadIcon />}
          >
            CSVインポート
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 
