import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Provider from './Context/Provider';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Register from './Pages/Register';
import OrderDetail from './Pages/OrderDetail';
import './style/index.css';
import Orders from './Pages/Orders';
import OrdersSeller from './Pages/OrdersSeller';
import Admin from './Pages/Admin';
import OrderSellerDetail from './Pages/OrderDetailSeller';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/orders/:id" component={ OrderDetail } />
        <Route exact path="/seller/orders/:id" component={ OrderSellerDetail } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/seller/orders" component={ OrdersSeller } />
        <Route exact path="/admin/manage" component={ Admin } />
        <Route exact path="/">
          <Redirect exact from="/" to="/login" />
        </Route>
      </Provider>
    </Switch>
  );
}

export default App;
