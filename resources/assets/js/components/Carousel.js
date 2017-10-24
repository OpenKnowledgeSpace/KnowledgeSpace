import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Carousel extends Component {  
 
  componentWillUpdate() { 
     $('.carousel').carousel('destroy'); 
  }
  componentDidUpdate() { 
    $('.carousel').carousel({ indicators: true, dist: 0, fullWidth: false }); 
   }
  
  render() {
    function breakArrayIntoGroups(data, maxPerGroup) {
      var groups = [];
      for (var index = 0; index < data.length; index += maxPerGroup) {
        groups.push(data.slice(index, index + maxPerGroup));
      }
      return groups;
    } 
    
    
    
    var images = breakArrayIntoGroups(this.props.images, 1); 
    var imageItems =  images.length > 1 ? 
                        images.map( function(item, i) { 
                          return ( <span key={i} className='carousel-item' dangerouslySetInnerHTML={{ __html: item }}></span> ) })
                        : <span>No Images Found Found</span>; 
    
    return(
      <div className="carousel" >
        {imageItems} 
      </div>
    ) 
  }
}

export default Carousel;
