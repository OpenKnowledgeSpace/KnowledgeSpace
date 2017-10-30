import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class PreloaderCircle extends Component {  

  render() { 
    if ( this.props.enabled ) { 
     return(
        <div className={ "preloader-wrapper " + this.props.classes } style={ this.props.style }>
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div> ) 
      } else { return null } 
  }
}

const defaultProps = {
  determination: "indeterminate",
  style: { width: '70%' },
  classes: "big active",
  style: {}
}

PreloaderCircle.defaultProps = defaultProps;
export default PreloaderCircle;
