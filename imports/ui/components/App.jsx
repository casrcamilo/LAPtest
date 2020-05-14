/** Libraries */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Pages */
import Home from '../containers/Home';

/** Components */
import Layout from './Layout';

const App = () => (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
