import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <div className="App">
      
      <CacheProvider value={cacheRtl}>
        <Layout>
        <div style={{marginLeft:'60rem',width:'26rem'}}>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          </div>
        </Layout>
        </CacheProvider>
    </div>
  );
}

export default App;
