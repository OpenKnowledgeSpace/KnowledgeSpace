import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Category extends Component {  

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); 
  }
 
  handleClick() { 
    this.props.onChangeCategory(this.props.label);   
  }
  
  render() {
    return( <li 
                onClick={ this.handleClick } 
                className={ this.props.activeCategory == this.props.label ? 'blue lighten-1 active btn' : 'blue lighten-3 waves-effect waves-light btn' }>
                <a className="white-text" href="#" >{ this.props.label }</a>
              </li>
      ) 
  }

}

export default Category;
