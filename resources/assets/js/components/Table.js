import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Table extends Component {  
  
  render() {
    var columns = Object.keys(this.props.columns).map(function(col, i) { 
                          return ( <th key={i} >{ this.props.columns[col] }</th> ) }.bind(this));
   
    var rows = this.props.rows.map(function( row, i ){
      return( <tr key={i}>{ Object.keys(this.props.columns).map( function(col, ci) { 
        return( <td key={ci} dangerouslySetInnerHTML={{ __html: row[col] }}></td> ) })} 
      </tr>)
    }.bind(this))
    
    return(
      <table className='highlight'>
        <thead>
          <tr>
            { columns }
          </tr>
        </thead>
        <tbody>
            { rows }
        </tbody>
      </table>
    ) 
  }
}

export default Table;
