import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePost from './pages/create';
import Home from './pages/home';
import Header from './Header';
import Blog from './pages/blog';
import { ApolloProvider } from '@apollo/client';
import { ApolloClientFactory } from '../client/apollo-client';

const App: FunctionComponent = () => {
  const client = ApolloClientFactory();

  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <br/>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create" exact component={CreatePost} />
              <Route path="/blogpage/:id" component={Blog} />
            </Switch>
          </ApolloProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
