import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from 'app/layout/App';
import HomePage from 'features/homePage/HomePage';
import EntityContainer from 'features/entity/Entity';
import EntitySearch from 'features/entitySearch/EntitySearch';
import DataSpaceContainer from 'features/dataSpace/DataSpace';
import LiteratureSearch from 'features/literature/LiteratureSearch';

const  Main = () => (
  <main>
    <Switch> 
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/wiki/:curie" component={EntityContainer}></Route>
      <Route exact path="/wiki/:curie/dataspace/:source" component={DataSpaceContainer}></Route>
      <Route exact path="/wiki/:curie/literature" component={LiteratureSearch}></Route>
      <Route exact path="/search" component={EntitySearch}></Route>
    </Switch>
  </main>
);

export default Main;
