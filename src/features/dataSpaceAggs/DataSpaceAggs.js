import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import {reduce, has, reject, isEmpty} from 'lodash'

import {DATASPACE_SOURCES} from '../dataSpace/dataSpaceConstants'
import DataSpaceCategory from './components/DataSpaceCategory'

const styles = theme => ({
  root: {
  },
  itemHeading: {
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeightRegular,
    paddingLeft: '15px'
  },
  dataSpaceAggs: {
    width: '100%',
    padding: '25px 25px 25px 50px',
    overflow: 'hidden',
    textAlign: 'justify'
  },
  categoryLabel: {
    textTransform: 'uppercase'
  },
  categoryList: {
    width: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 0
  },
  categorySubtitle: {
    paddingLeft: 0,
    margin: 0,
    fontSize: theme.typography.h5.fontSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  categoryResultsFound: {
    fontSize: theme.typography.h6.fontSize,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  sourceButton: {
    paddingBottom: 0
  },
  sourceLabel: {
    fontSize: theme.typography.h6.fontSize
  },
  sourceResultsFound: {},
  sourceDivider: {
    marginTop: 22
  }
})

class DataSpaceAggs extends Component {
  render() {
    const {aggByType, entity, classes} = this.props
    const types = reject(Object.keys(aggByType), o => isEmpty(aggByType[o].sources))
    return (
      <Paper className={classes.dataSpaceAggs} elevation={1}>
        <Typography variant="h3">DataSpace</Typography>
        <Divider/>
        <List component="nav">
          {
            types.map(type => {
              const {sources, doc_count} = aggByType[type]
              return (
                <ListItem key={type} classes={{}} disableGutters>
                  <DataSpaceCategory
                    classes={classes}
                    entity={entity}
                    label={type}
                    sources={sources}
                    doc_count={doc_count}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </Paper>
    )
  }
}

// We take our bucket aggs coming in from ES and merge that with our
// DataSpace source definitions.
const mapStateToProps = ({dataSpaceAggs, entity}) => {
  // First lets take our ES buckets and flatten them to a dictionary.
  // { source_id: 1 }
  const aggs = reduce(dataSpaceAggs, (memo, {key, doc_count}) => {
    memo[key] = doc_count
    return memo
  }, {})
  // Now we take our DATASPACE_SOURCES, group by type, and add our agg counts
  const aggByType = reduce(DATASPACE_SOURCES, (memo, value, key) => {
    const {type} = value
    value.id = key
    if (!has(memo, type)) {
      memo[type] = {sources: [], doc_count: 0}
    }
    if (has(aggs, key)) {
      memo[type].doc_count = memo[type].doc_count + aggs[key]
      value.doc_count = aggs[key]
      memo[type].sources.push(value)
    }
    return memo
  }, {})
  return {aggByType, entity}
}

export default withStyles(styles)(connect(mapStateToProps)(DataSpaceAggs))
