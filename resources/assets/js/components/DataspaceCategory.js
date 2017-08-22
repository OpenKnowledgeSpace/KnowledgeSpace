import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DataspaceCategory extends Component {  

  constructor(props) {
    super(props);
    this.state = { count: 0, term: this.props.term }; 
  }

  sanitizeTerm ( ) { 
    return this.state.term.replace(/\ cell|\ neuron$/g, ''); 
  }

  componentDidMount () { 
      this.props.sourceCuries.forEach( function(curie ) { 
        $.ajax({ url: '/api/dataspace/' + curie + '?q=' + this.sanitizeTerm() ,
                 dataType: 'json', 
        }).then( function(data) { 
                   const count = this.state.count; 
                   const resultCount = data.result.resultCount || 0;  
                   this.setState( { count: count + resultCount }); 
                 }.bind(this))
      }.bind(this));
  }

  render() {
    return (
      <li> <div className="btn btn-primary dataspace-category clearfix"><span className='pull-left'>{this.props.category}</span><span className='badge category-counter pull-right'>{this.state.count}</span></div></li> 
    )}

}

export default DataspaceCategory;
