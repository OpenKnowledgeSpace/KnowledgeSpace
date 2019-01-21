import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'

import {values, keys, get, isArray, has} from 'lodash'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  table: {
    minWidth: 1020
  }
})

const cellValue = (value = '') => {
  if (isArray(value)) {
    return value.join('; ')
  }
  return value
}

const DataSpaceResults = ({hits, classes, columns, page, handlePageChange}) => {
  const results = has(hits, 'hits') ? hits.hits : []
  const total = has(hits, 'total') ? hits.total : 0

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.filterTitle}>{ get(hits, 'total') || 0} records found</Typography>
      <Divider/>
      <Table className={classes.table} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            { values(columns).map((val, i) => <TableCell key={i}>{val}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          { results.map(hit => (
            <TableRow
              key={hit._id}
              hover
              onClick={event => window.open(get(hit._source, 'dc.identifier'), '_blank')}
              role="checkbox"
              tabIndex={-1}
            >
              { keys(columns).map((key, i) => <TableCell key={i}>{cellValue(get(hit._source, key))}</TableCell>) }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={10}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={() => {}}
      />
    </div>
  )
}

export default withStyles(styles)(DataSpaceResults)
