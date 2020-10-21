import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/checkout/checkout";
import Orders from './containers/Orders/Orders';

const App = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
