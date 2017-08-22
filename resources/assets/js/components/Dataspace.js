import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataspaceCategory from './DataspaceCategory';

class Dataspace extends Component {  

  constructor(props) {
    super(props);
    this.state = { terms: this.props.terms, categories: {}  }; 
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.terms[0] !== this.state.terms[0] ) {
      $.ajax({ url: '/api/dataspace',
               dataType: 'json', 
               success: function(data) { 
                  this.setState( { categories: data.reduce( function( memo, val ) { 
                    val.categories.forEach( function(v) { 
                      memo[v] = Array.isArray(memo[v]) ? memo[v].concat(val.curie) : [ val.curie ]; 
                    });    
                    return memo; 
                  }, {} )}); 
                }.bind(this)
      });
    }
  }
  
  render() {
    var state = this.state; 
    var props = this.props; 
    return (
      <div> 
        <h3>Dataspace</h3>
        <ul id='dataspace-categories' >
          { Object.keys(state.categories).map( function(cat, i) { 
            return <DataspaceCategory key={i} category={cat} sourceCuries={state.categories[cat]} term={props.terms[0]} /> 
          })}
        </ul>
      </div> 
    )}

}

export default Dataspace;

if (document.getElementById('dataspace-box')) {
  const el = document.getElementById('dataspace-box') 
  ReactDOM.render( <Dataspace curie={ el.attributes['data-curie'].value } />, el );
}
