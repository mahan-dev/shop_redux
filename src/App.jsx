import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Home from './components/Home';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import ShopCard from './components/ShopCard/ShopCard';
import ProductDetails from './components/productDetailsPage/ProductDetails';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Router>
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductDetails />}  />
              <Route path='/product/shopCard' element={<ShopCard />} />

            </Routes>
          </Router>
        </Layout>
      </Provider>
    </>
  );
};

export default App;