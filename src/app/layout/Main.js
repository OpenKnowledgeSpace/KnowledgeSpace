import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import HomePage from 'pages/HomePage'
import EntityPage from 'pages/EntityPage'
import SearchPage from 'pages/SearchPage'
import DataSpacePage from 'pages/DataSpacePage'
import LiteraturePage from 'pages/LiteraturePage'
import AboutPage from 'pages/AboutPage'
import WikiPage from 'pages/WikiPage'
import ContactPage from 'pages/ContactPage'

const styles = theme => ({
  root: {
    marginBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '72px',
    flex: '1 1 100%',
    paddingTop: '80px'
  }
})

const Main = props => {
  const {classes} = props
  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/t/:slug" component={EntityPage}/>
        <Route exact path="/search" component={SearchPage}/>
        <Route exact path="/t/:slug/dataspace/:source" component={DataSpacePage}/>
        <Route exact path="/t/:slug/literature" component={LiteraturePage}/>
        <Route exact path="/wiki/:curie" component={WikiPage}/>
      </Switch>
    </main>
  )
}
export default withStyles(styles)(Main)