import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {isArray, keys, isEmpty, has} from 'lodash'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'

import SearchBox from 'common/components/search/SearchBox'
import Facets from 'common/components/search/Facets'
import Pagination from 'common/components/search/Pagination'
import Detail from '../entity/components/Detail'
import {updateCurie} from '../entity/entityActions'
import LiteratureResult from './components/LiteratureResult'
import {submitSearch, paginateSearch} from './literatureActions'

const styles = theme => ({
  root: {
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
    paddingTop: 10,
    textAlign: 'left'
  },
  entityLink: {
    paddingRight: theme.mixins.gutters().paddingRight,
    paddingLeft: theme.mixins.gutters().paddingLeft
  },
  divider: {
    marginRight: theme.mixins.gutters().paddingRight * 1.5,
    marginLeft: theme.mixins.gutters().paddingLeft * 1.5,
    marginTop: 2
  }
})

class LiteratureSearch extends Component {
  componentDidMount() {
    if (isEmpty(this.props.entity)) {
      this.props.dispatch(updateCurie(this.props.curie))
    }
  }

  handlePagination() {
    const {entity, filters, source, q} = this.props
    const page = this.props.page + 1
    this.props.dispatch(paginateSearch({q, entity, filters, source, page}))
  }

  handleFacetToggle(facet, values) {
    const {curie, filters, q} = this.props
    filters[facet] = values
    this.props.dispatch(submitSearch({q, filters, curie}))
  }

  render() {
    const {results, entity, filters, facets, classes, curie} = this.props
    const label = entity.labels ? entity.labels[0] : ''
    const {hits} = results

    return (
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
        <Grid item xs={12} sm={3}>
          <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)}/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper elevation={1}>
            <Typography variant="h3" classes={{root: classes.root}}>
                Literature Results:
              <Link className={classes.entityLink} to={`/wiki/${curie}`}>
                {label}
              </Link>
            </Typography>
            <Divider classes={{root: classes.divider}}/>
            <List>
              { hits.map(hit => <LiteratureResult key={hit._id} disableGutters={false} result={hit._source}/>) }
            </List>
            { results.total > 20 && <Pagination handlePagination={this.handlePagination.bind(this)}/> }
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({literature, entity}, ownProps) => {
  const curie = isEmpty(entity) ? ownProps.curie : entity.curie
  return {...literature, curie, entity}
}

export default withStyles(styles)(connect(mapStateToProps)(LiteratureSearch))
