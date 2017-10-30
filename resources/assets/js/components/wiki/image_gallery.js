import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carousel from "./carousel";

class ImageGallery extends Component {  

  constructor(props) {
    super(props);
    this.state = { images: [] };
  }
  
  componentDidMount () { 
    let url = '/api/data_space/images/' + this.props.curie;
    axios.get(url).then( function(response) { this.setState({images: response.data}) }.bind(this) )
      .catch( function(error) {  this.setState( { images: [], notFound: true }) }.bind(this) );
  }

  render() {
    var state = this.state; 
    var props = this.props; 
    return (
    <div className='col m4 s12 scrollspy' id='image-gallery'>      
      <div className='card cyan lighten-5'> 
        <div id="image-gallery" className='card-content'> 
          <span className='card-title'>Image Gallery</span>
          <Carousel /> 
        </div>
      </div> 
    </div>
    )}

}

export default ImageGallery;
