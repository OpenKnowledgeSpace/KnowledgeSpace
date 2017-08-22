import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from "./List";

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
      <div className='container'> 
        <section id="image-gallery"> 
          <h3>Image Gallery</h3>
          <List items={this.state.images} name='image-gallery' /> 
        </section>
      </div> 
    )}

}

export default ImageGallery;

if (document.getElementById('image-gallery-box')) {
  const el = document.getElementById('image-gallery-box') 
  ReactDOM.render( <ImageGallery curie={ el.attributes['data-curie'].value } />, el );
}
