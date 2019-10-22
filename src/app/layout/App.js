import React, {Component} from 'react'

import withRoot from 'withRoot'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

import Nav from './Nav'
import Main from './Main'
import GA from 'features/googleAnalytics/GoogleAnalytics'

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
})

class App extends Component {
  render() {
	  const {classes} = this.props

    return (
      <div className={classes.root}>
        { GA.init() && <GA.RouteTracker /> }
        <Nav/>
        <Main/>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(App))
