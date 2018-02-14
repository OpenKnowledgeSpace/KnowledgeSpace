import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Carousel extends Component {  
 
  componentWillUpdate() { 
     $('.carousel').carousel('destroy'); 
  }
  
  componentDidUpdate() { 
    $('.carousel').carousel({ indicators: true, fullWidth: false }); 
   }

  componentDidMount() {
    $('.carousel').carousel({ indicators: true,  fullWidth: false }); 
  }


  getImages() {
    let images = this.props.images || [];
    return images.map( function(image,i) { 
      if ( image.src !== null ) { 
        return ( <a key={i} className='carousel-item' href={ image.href } ><img src={ image.src }></img></a> ) 
      } else {
        return (
          <a href={image.href } className='carousel-item' key={i}>
            <img src="/imgs/no_image.png"></img> 
          </a>
        )
      }
     })
  }


  render() {
  
    var imageItems =  this.props.images.length > 1 ? 
                        this.getImages() :   
                        <span>No Images Found Found</span>; 
    
    return(
      <div className="carousel" >
        {imageItems} 
      </div>
    ) 
  }
}

export default Carousel;
