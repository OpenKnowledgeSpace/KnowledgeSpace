import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Carousel extends Component {  
 
  componentWillUpdate() { 
     $('.carousel').carousel('destroy'); 
  }
  
  componentDidUpdate() { 
    $('.carousel').carousel({ indicators: true, fullWidth: true, padding: 10 }); 
   }

  componentDidMount() {
    $('.carousel').carousel({ indicators: true,  fullWidth: true, padding: 10 }); 
  }


  getImages() {
    let images = this.props.images || [];
    return images.map( (image,i) => <a href={ image.href } className="carousel-item" key={i} ><img src={ image.src } /></a> )
  }


  render() {
  
    var imageItems =  this.props.images.length > 1 ? 
                        this.getImages() :   
                        <span>No Images Found Found</span>; 
    
    return(
      <div className="carousel center" >
        {imageItems} 
      </div>
    ) 
  }
}

export default Carousel;
