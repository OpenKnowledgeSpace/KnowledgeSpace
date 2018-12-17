import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { isArray, keys, has } from 'lodash';
import  querystring  from 'querystring';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

import {submitSearch, paginateSearch} from './entitySearchActions';

import EntityResults from './components/EntityResults';

import SearchBox from 'common/components/search/SearchBox';
import Facets from 'common/components/search/Facets';
import Pagination from 'common/components/search/Pagination';

import {ENTITY_RESULTS_COLUMNS} from './entitySearchConstants';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

export class EntitySearch extends Component {

  state = { 
    q: '' 
  }
  
  componentDidMount() {
    console.log("hii") 
    const {q} = this.props;
    this.state = {q} 
    // const query = querystring.parse(this.props.location.search.replace('?', '')); 
    // const {q} = query;
    // this.props.dispatch(submitSearch({q, ...this.props}));
  }
  
  handleQuery({target}) {
    const {filters} = this.props;
    this.props.dispatch(submitSearch({q: target.value, filters, page: 1}));
  }
 
  handlePagination() {
    const {filters, q} = this.props;
    const page = this.props.page + 1; 
    this.props.dispatch(paginateSearch({q, filters, page}));
  }

  handleFacetToggle(facet, selected) {
    const {q, filters} = this.props;
    filters[facet] = selected; 
    this.props.dispatch(submitSearch({q, filters, page: 1}));
  }

  render() {
    const { filters, facets, results, classes} = this.props; 
    const {q} = this.state; 
    const  cols = ENTITY_RESULTS_COLUMNS;  

    return(
      <Grid container direction='row' justify='flex-start' alignItems='flex-start' spacing={16}>
        <Grid item xs={12} sm={3}  > 
          <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
        </Grid> 
        <Grid item xs={8} sm={9}> 
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}> 
              <SearchBox q={q} onChange={this.handleQuery.bind(this)} context="entitySearch" />
            </AppBar>
            <div className={classes.contentWrapper}>
              <EntityResults hits={results} />  
              <Pagination handlePagination={this.handlePagination.bind(this)} />
            </div> 
          </Paper>
        </Grid> 
      </Grid>
    ); 
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch};
}

export default withStyles(styles)(connect(mapStateToProps)(EntitySearch));
