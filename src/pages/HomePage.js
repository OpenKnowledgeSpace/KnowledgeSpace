import React, {Component} from 'react'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'

import Autosuggest from 'features/autosuggest/Autosuggest'

const styles = theme => ({
  inputRoot: {},
  inputInput: {
    fontSize: theme.typography.h5.fontSize,
    paddingLeft: '10px'
  },
  searchContainer: {
    marginTop: '20px'
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    '&:hover': {
      boxShadow: theme.shadows[5],
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: '100%'
  }
})

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container direction="column" justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2">KnowledgeSpace</Typography>
          <Typography variant="subtitle1" gutterBottom>A community encyclopedia linking brain research concepts to data, models, and literature.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.searchContainer}>
            <Autosuggest classes={classes} history={this.props.history}/>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch}
}

export default withStyles(styles)(connect(mapStateToProps)(HomePage))
