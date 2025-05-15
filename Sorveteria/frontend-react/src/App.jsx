import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import Admin from './pages/Admin';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <header style={{ padding: '1rem', backgroundColor: theme.palette.primary.main, color: '#fff' }}>
          <h1>Sorveteria Sovitha</h1>
          <nav>
            <Link to="/" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>Início</Link>
            <Link to="/carrinho" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>Carrinho</Link>
            <Link to="/pedidos" style={{ marginRight: '1rem', color: '#fff', textDecoration: 'none' }}>Meus Pedidos</Link>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Administração</Link>
          </nav>
        </header>
        <main style={{ padding: '1rem', backgroundColor: theme.palette.background.default, minHeight: 'calc(100vh - 72px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}
