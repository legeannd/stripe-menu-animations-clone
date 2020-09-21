import React from 'react';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>

      <GlobalStyles />
    </>
  );
}

export default App;
