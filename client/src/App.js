import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// コンポーネントのインポート
import Layout from './components/Layout';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import CustomerEdit from './components/CustomerEdit';
import ImportCSV from './components/ImportCSV';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customer/:id" element={<CustomerDetail />} />
            <Route path="/customer/:id/edit" element={<CustomerEdit />} />
            <Route path="/import" element={<ImportCSV />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
