import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {isNull, isUndefined, isEmpty, keys, has} from 'lodash'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'

import SearchBox from 'common/components/search/SearchBox'
import Facets from 'common/components/search/Facets'
import Pagination from 'common/components/search/Pagination'
import DataSpaceResults from './components/DataSpaceResults'
import {updateEntityAndSource, submitSearch, paginateSearch} from './dataSpaceActions'

import {DATASPACE_SOURCES} from './dataSpaceConstants'

const styles = theme => ({
  root: {
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
    paddingTop: 10,
    textAlign: 'left'
  },
  entityLink: {
    paddingRight: theme.mixins.gutters().paddingRight,
    paddingLeft: theme.mixins.gutters().paddingLeft,
    paddingBottom: 10

  },
  divider: {
    marginRight: theme.mixins.gutters().paddingRight * 1.5,
    marginLeft: theme.mixins.gutters().paddingLeft * 1.5,
    marginTop: 2
  }
})

class DataSpaceSearch extends Component {
  componentDidMount() {
    const {hash, source} = this.props
    this.props.dispatch(updateEntityAndSource({hash, source}))
  }

  handleFacetToggle(facet, selected) {
    const {q, filters, entity, source} = this.props
    filters[facet] = selected
    this.props.dispatch(submitSearch({q, filters, page: 0, entity, source}))
  }

  handlePageChange(event, newPage) {
    const {entity, filters, source, q, page} = this.props
    if (newPage != page) {
      this.props.dispatch(submitSearch({q, filters, entity, source, page: newPage}))
    }
  }

  render() {
    const {classes,  entity, sourceConfig, filters, facets, results, page} = this.props
    const { slug, category } = entity;
    const entityLabel = entity.label;
    const {columns, label} = sourceConfig

    return (
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
        <Grid item xs={12} sm={3}>
          { facets && <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)}/> }
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper elevation={1}>
            <Typography variant="h3" classes={{root: classes.root}}>
              {label} Results:
              <Link className={classes.entityLink} to={`/t/${category}/${slug}`}>
                {entityLabel}
              </Link>
            </Typography>
            <Divider classes={{root: classes.divider}}/>
            <DataSpaceResults hits={results} columns={columns} page={page || 0} handlePageChange={this.handlePageChange.bind(this)} linkCol="dc.identifier"/>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({dataSpace, entity}, ownProps) => {
  const curie = isEmpty(entity) ? ownProps.curie : entity.curie
  const {source} = ownProps
  const sourceConfig = DATASPACE_SOURCES[ownProps.source] || {}

  if (dataSpace.source !== ownProps.source) {
    return {source, curie, entity, sourceConfig}
  }
  return {...dataSpace, source, curie, entity, sourceConfig}
}

export default withStyles(styles)(connect(mapStateToProps)(DataSpaceSearch))
