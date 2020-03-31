import React, {Component} from 'react'
import EntitySearch from 'features/entitySearch/EntitySearch'
import  querystring  from 'querystring';

const SearchPage = props => {
  const query = querystring.parse(props.location.search.replace('?', '')); 
  const {q} = query;
    // this.props.dispatch(submitSearch({q, ...this.props}));
  return (
    <EntitySearch q={q} history={props.history} />
  )
}

export default SearchPage
