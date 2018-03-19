import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carousel from "./carousel";

import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

class ImageGallery extends Component {  

  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      page: 1,
      preloader: true,
      numFound: 0
    };
    this.getSources = this.getSources.bind(this);
    this.getImageList = this.getImageList.bind(this);
    this.onChangePage = this.onChangePage.bind(this); 
  }
  
  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, images: [] },  this.queryDataSpace );
  }
  
  sanitizeTerm (term) { 
    return term.replace(/\ cell|\ neuron$/g, ''); 
  }

  queryDataSpace(terms) { 
    if ( typeof terms == 'undefined' ) { 
      terms = this.props.terms
    } 
    let sanitizeTerm = this.sanitizeTerm;
    terms = terms.map( (term) => { return "terms[]=" + sanitizeTerm(term) } ).join("&");
    let size = this.props.per_page;
    // a funny solr thing. if we're on page 1 we start a item 0  
    let from = '&from=' + ( size * ( this.state.page - 1 ) );
    size = "&size=" + size;
    let url = '/api/data_space/images' + '?' + terms + size + from;  
    
    if ( terms.length > 0 ) { 
      axios.get(url)
      .then( function(response) {
        let images = response.data.hits.hits.map( (hit) => hit._source.access.landingPage ),
          mapper  =  function(image){ 
            if ( image.includes('Cell Image Library Dataset') ) {
              let id = image.match(/.*\:(.*)$/)[1],
                src = "https://cildata.crbs.ucsd.edu/media/thumbnail_display/" + id + "/" + id + "_thumbnailx512.jpg"; 
              return {
                href: image.replace("Cell Image Library Dataset CIL:", ""),
                src: src
              }
            } else { 
              return { href: image, src: null }
            }
          }
        this.setState({ images: images.map( mapper ),
                        queryTerms: terms,
                        preloader: false,
                        numFound: response.data.hits.total,
                        sources: response.data.aggregations.source_count.buckets
                      })
      }.bind(this) )
      .catch( function(error) {  this.setState( { error: error,  notFound: true }) }.bind(this) );
    }
  }
  
  componentDidMount() {
    if  ( this.props.terms && this.props.terms.length > 0 ) { 
      this.queryDataSpace(this.props.terms); 
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.terms !== this.props.terms ) {
      this.queryDataSpace(nextProps.terms); 
    }
  }

  getImageList() {
    let images = this.state.images || []; 
    return ( 
      <ul id='image-list'>  
       { 
         images.map( function(image, i) {  
          if ( image.src !== null ) {   
            return <li key={i} className={ 'image-item active ' }>
                      <a href={image.href }>
                        <img src={ image.src }></img>
                      </a>
                    </li> 
          } else {
            return <li key={i} className={ 'image-item inactive' }>
                      <a href={image.href }>
                        <i className="large material-icons center-align">broken_image</i>
                        <h6 className='center-align'>Image Missing. Click To View At Source Repository.</h6> 
                      </a>
                    </li> 
          } 
        })
       }
      </ul>
    )
  }


  // This matches the index names ( which ES returns as an AGG ) to the name of
  // the source. We use this for the back card.
  getSources() {
    let sources = this.state.sources || [];
    sources = sources.map( function(source) { 
      let prefix = source.key.split("_")[0]
      switch(prefix) {
        case "neuromorpho":
          source.source = "NeuroMorpho.org"
          break;
        case "cil":
          source.source = "Cell Image Library" 
          break;
        case "nitr":
          source.source = "NITRC-IR"
          break;
        case "openfmri":
          source.source = "OpenfMRI"
          break;
        case "ks":
          source.source =  "Integrated Connectivity"
          break; 
        case "neurosynth":
          source.source = "Neurosynth"
          break; 
        default:
          source.source = source.key
      } 
      return source
    }) 
    
    return ( 
      <ul>{sources.map( (source,i) => <li key={i}>{source.source} ( {source.doc_count } records found )</li> )}</ul> 
     )
  
  }

  render() {
    let state = this.state,
      props = this.props; 
    let images  = this.state.images || [];
    let sources = this.getSources(), 
      imageList = this.getImageList(); 

    return (
      <div className={ props.classes } id='image-gallery'>      
        <div className='card'> 
          <div id="image-gallery" className='card-content'> 
            <span className='card-title activator' style={{ width: '100%'}} >Image Gallery ( { state.numFound } images found ) 
              <i className='material-icons right'>more_vert</i>
              <a href={ '/image_gallery?' + this.state.queryTerms } className="embedded-only right waves-effect waves-light">
                <i className="material-icons">search</i>
              </a> 
            </span>
            <Preloader enabled={ state.preloader } wrapperStyle={{ width: '99%', margin: 'auto', padding: '6px', top: '200px' }} /> 
            { images.length > 0  && props.embedded &&  <Carousel images={ images }  />  }
            { images.length > 0  && !props.embedded &&  imageList  }
            
            <div className='card-action center' style={{ clear: 'both' }} > 
              { !props.embedded && <Pagination items={ state.numFound } onChangePage={this.onChangePage}  / > } 
            </div> 
          </div>
          <div className="card-reveal grey-text text-darken-4">
            <span className='card-title'>Image Sources<i className='material-icons right'>close</i></span>
            { sources } 
          </div>      
        </div> 
      </div>
    )}

}

const defaultProps = {
    classes: 'col m12 s12 scrollspy embedded',
    per_page: 20,
    embedded: true
}
ImageGallery.defaultProps = defaultProps;

export default ImageGallery;
