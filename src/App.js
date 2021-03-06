import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import {ArticlesList} from './blog/articles-list/articles-list';
import {ArticleEditor} from './blog/article-editor/article-editor';

import './App.scss';

const history = createBrowserHistory()


class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="App">
            <Switch>
                <Route path="/articles/:id/edit" component={ArticleEditor}/>
                <Route path="/articles/add" component={ArticleEditor}/>
                <Route path="/articles" component={ArticlesList} />
                <Redirect from="/" to="/articles"/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
