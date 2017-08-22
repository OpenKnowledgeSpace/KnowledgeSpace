import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class List extends Component {  
  
  render() {
    var items =  this.props.items.map( function(item, i) { 
                     return ( <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li> ); 
         });
    
    return(
      <ul id={this.props.name + "-list"} >
        {items} 
      </ul>
    ) 
  }
}

export default List;
