import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carousel from "./Carousel";

class ImageGallery extends Component {  

  constructor(props) {
    super(props);
    this.state = { images: [] };
  }
  
  componentWillMount () { 
    $.ajax({ url: '/api/dataspace/images/' + this.props.curie,
             dataType: 'json', 
             success: function(data) { 
              this.setState({ images: data }); 
             }.bind(this)
    });
  }

  render() {
    var state = this.state; 
    var props = this.props; 
    return (
    <div className='col m4 s12'>      
      <div className='card cyan lighten-5'> 
        <div id="image-gallery" className='card-content'> 
          <span className='card-title'>Image Gallery</span>
          <Carousel images={this.state.images} /> 
        </div>
      </div> 
    </div>
    )}

}

export default ImageGallery;

if (document.getElementById('image-gallery-box')) {
  const el = document.getElementById('image-gallery-box') 
  ReactDOM.render( <ImageGallery curie={ el.attributes['data-curie'].value } />, el );
}
