import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Preloader from './preloader';

class TableRow extends Component {  
  
  constructor(props) { 
    super(props);
    this.handleRowClick = this.props.handleRowClick.bind(this);
  }

  render() {
    let row = this.props.row,
      columns = this.props.columns;
   
    return( <tr onClick={ this.handleRowClick }>
        { columns.map( function(col, i) { 
          // We walk through the returned data and use dot notation from the
          // columns to pull our values.  
          let value = col.split('.').reduce((memo, current) => { 
            // it's an array, we return an array of values from the current
            // field. 
            if ( memo instanceof Array ) { 
              return memo.map( (m) => m[current] ); 
            } else { return memo[current] }
          } , row );
         
          // we have an array we need to put into a cell. Do some formmating...
          if ( value instanceof Array ) { 
            value = value.map( (a) => a.replace(/^\s+|\s+$/g, '')).filter((v) => !v.match(/^,/));
          }
          return( <td key={i} dangerouslySetInnerHTML={{ __html: value }}></td> ) })}
      </tr>);
  }

}


class Table extends Component {  



  render() {
    let columns = this.props.columns, 
     headerColumns = Object.keys(columns).map(function(col, i) { 
                          return ( <th key={i} >{ columns[col] }</th> ) }),
      handleRowClick = this.props.handleRowClick, 
      preloader = this.props.preloader;
 
       
    var rows = this.props.rows.map( function( row, i ){
      return ( <TableRow key={i} columns={ Object.keys(columns) } row={ row } handleRowClick={ handleRowClick } />  ) 
    });

    let preloaderHtml  = ( <Preloader enabled={preloader} wrapperStyle={{ top: '15px', width: '99%', padding: '3px', margin: 'auto' }} /> ) 

    let table = 
      <table className='highlight'>
        <thead>
          <tr>
            { preloader ? preloaderHtml : headerColumns }
          </tr>
        </thead>
        <tbody>
            { preloader ? preloaderHtml : rows }
        </tbody>
      </table>
    return(table) 
  }
}

export default Table;
