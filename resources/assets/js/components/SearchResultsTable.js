import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class SearchResultsTable extends Component {  

  onRowClick(row) { 
    window.location = "/wiki/" + row.curie; 
  }

  curieFormatter(cell) {
    return `<a href='/wiki/${cell}'>${cell}</a>`; 
  } 

  render() {
    var results = this.props.results; 
    var curieFormatter = this.curieFormatter;
    return( 
        <BootstrapTable data={this.props.results} striped hover bordered={false} options= { { noDataText: 'No results found.', onRowClick: this.onRowClick } }>
          <TableHeaderColumn dataField="curie" isKey dataSort width="20%" dataFormat={ curieFormatter }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="labels" dataSort width="20%">Labels</TableHeaderColumn>
          <TableHeaderColumn dataField="categories" dataSort width="20%">Categories</TableHeaderColumn>
          <TableHeaderColumn dataField="definitions" width="40%">Definitions</TableHeaderColumn>   
        </BootstrapTable>
      )
    
    }; 
   

}

export default SearchResultsTable;
