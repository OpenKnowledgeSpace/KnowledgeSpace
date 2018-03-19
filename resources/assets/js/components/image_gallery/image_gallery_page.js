import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from './image_gallery'

class ImageGalleryPage extends Component {  


  
    constructor(props) {
      super(props);
    }


    render() {
    
      let termChips = this.props.terms.map( (term, i) => (<div key={i} className='chip'>{term}</div>) );
    
    return( 
      <div className='section'>
        <div className="row">
            <h2 className='col s12 page-title' style={{ marginTop: "5px" }} >
              Image Gallery
              <span style={{ fontSize: '20px'  }} className='right'> 
                <a href={ '/wiki/' + this.props.termCurie } className='left'>View Term Overview Page</a> 
              </span> 
            </h2>
        </div>
        <div className="row"> 
          <div className='col m12 s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text col s12"> 
                <div className='input-field'>
                  <span>Search Term:</span> { termChips }
                </div>
              </div> 
            </div>
          </div>
        </div>
        <ImageGallery terms={ this.props.terms } classes='col m12 s12 page' per_page={20} embedded={false} />
      </div>
    )
  }


}

if (document.getElementById('image-gallery-page')) {
  const el = document.getElementById('image-gallery-page'); 
  ReactDOM.render( <ImageGalleryPage
    terms={ el.attributes['data-terms'].value.split(',') } 
    termCurie={ el.attributes['data-term-curie'].value } 
    page={ el.attributes['data-page'].value } />,
    el) ;
}
