import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class List extends Component {  
  
  render() {
    var items = this.props.items; 
    var itemsList =  items.length > 1 ? 
                        items.map( function(item, i) { 
                          return ( <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li> ) })
                        : <li>No { this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) } Found</li>; 
    
    return(
      <ul id={this.props.name + "-list"} >
        {itemsList} 
      </ul>
    ) 
  }
}

export default List;
