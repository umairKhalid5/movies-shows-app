import React from 'react';
import Layout from './components/Layout';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Layout />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
