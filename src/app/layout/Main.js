import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from 'app/layout/App';
import HomePage from 'features/homePage/HomePage';
import WikiPageContainer from 'features/wikiPage/WikiPage';
import SearchPage from 'features/searchPage/SearchPage';

const  Main = () => (
  <main>
    <Switch> 
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/wiki/:curie" component={WikiPageContainer}></Route>
      <Route exact path="/search" component={SearchPage}></Route>
    </Switch>
  </main>
);

export default Main;
