import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import HomePage from 'pages/HomePage';
import EntityPage from 'pages/EntityPage';
import SearchPage from 'pages/SearchPage';
import DataSpacePage from 'pages/DataSpacePage';
import LiteraturePage from 'pages/LiteraturePage';

const styles = theme => ({
  root: {
    marginBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '72px',
    flex: '1 1 100%', 
    paddingTop: '80px'
  },
});

const  Main = (props) => {
  const {classes} = props; 
  return( 
    <main className={classes.root}>
    <Switch> 
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/wiki/:curie" component={EntityPage}></Route>
      <Route exact path="/search" component={SearchPage}></Route>
      <Route exact path="/wiki/:curie/dataspace/:source" component={DataSpacePage}></Route>
      <Route exact path="/wiki/:curie/literature" component={LiteraturePage}></Route>
    </Switch>
  </main>
  );
}
export default withStyles(styles)(Main);
