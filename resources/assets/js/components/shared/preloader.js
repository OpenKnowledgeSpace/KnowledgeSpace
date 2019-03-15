import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Preloader extends Component {  

  render() { 
    if ( this.props.enabled ) { 
     return(
    <div className="progress" style={this.props.wrapperStyle}> 
      <div className={ this.props.determination } style={this.props.style}></div> 
    </div> ) } else { return null } 
  }
}



const defaultProps = {
  determination: "indeterminate",
  wrapperStyle: { }, 
  style: { width: '70%' }
}
Preloader.defaultProps = defaultProps;
export default Preloader;
