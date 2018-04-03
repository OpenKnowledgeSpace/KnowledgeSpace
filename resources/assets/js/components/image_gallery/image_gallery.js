import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carousel from "./carousel";

import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

class ImageGallerySource extends Component {  

  render() {
    let { source } = this.props; 
    return (<a href={source.home}>{source.name} ( {source.hits} images )</a>)
  }

}


class ImageList extends Component {  


  render() {
    let images = this.props.images || []; 
    return ( 
      <ul id='image-list'>  
       { images.map( function(image, i) {  
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
}

class ImageGallery extends Component {  

  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      page: 1,
      preloader: true,
      numFound: 0,
      sources: []
    };

    this.getSourceHits = this.getSourceHits.bind(this);
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
    let from = '&offset=' + ( size * ( this.state.page - 1 ) );
    size = "&count=" + size;
    let url = '/api/data_space/images' + '?' + terms + size + from;  
    
    if ( terms.length > 0 ) { 
      axios.get(url)
      .then( function(response) {
        let { data } = response,
          sources = Object.keys(data);

        let parser = new DOMParser()
        let rows = sources.map( (source_curie) => response.data[source_curie].data.result.results.row ).reduce( (a,b) => a.concat(b), [] ),
          images = rows.map( (row) => row.data.filter( (col) => col.name === "Image" )[0].value ).map( (img) => {
            let html = parser.parseFromString(img, 'text/xml'),
              href = html.firstElementChild.getAttribute('href'),
              src = html.firstElementChild.firstElementChild.getAttribute('src');
              return { href, src }
          })
       
        let numFound = sources.map(  (source_curie) => parseInt( response.data[source_curie].data
          .result["@attributes"].resultCount ) )
          .reduce( (a,b) => a.concat(b), []).reduce( (a,b) => a + b, 0 )

        let sourceHits = this.getSourceHits(sources, response.data);      

        this.setState({ images: images,
                        queryTerms: terms,
                        numFound: numFound,
                        preloader: false,
                        sources: sourceHits 
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

  // This matches the index names ( which ES returns as an AGG ) to the name of
  // the source. We use this for the back card.
  getSourceHits(sources, results) {
    let data = sources.map( function(source_curie) { 
      let source = {}
      source.hits = results[source_curie].data.result["@attributes"].resultCount
      
      switch(source_curie) {
        case "nif-0000-00006-1":
          source.name = "NeuroMorpho:ModelImage"
          source.home = "http://neuromorpho.org/"
          break;
        case "nif-0000-37639-1":
          source.name = "Cell Image Library" 
          source.home = "http://www.cellimagelibrary.org" 
          break;
        default:
          source = {}
      } 
      return source; 
    }) 
    return data;
  }

  render() {
    let { embedded, classes, curie } = this.props;
    let { images, sources, numFound, queryTerms, preloader }  = this.state;
    
    return (
      <div className={ classes } id='image-gallery'>      
        <div className='card'> 
          <div id="image-gallery" className='card-content'> 
            <span className='card-title activator' style={{ width: '100%'}} >Image Gallery
               { !preloader && <span>( { numFound } record found )</span> }
              <i className='material-icons right'>more_vert</i>
              <a href={ '/image_gallery?termCurie=' + curie + "&" + queryTerms } className="embedded-only right waves-effect waves-light">
                <i className="material-icons">search</i>
              </a> 
            </span>
            <Preloader enabled={ preloader } wrapperStyle={{ width: '99%', margin: 'auto', padding: '6px', top: '200px' }} /> 
            { images.length > 0  && embedded &&  <Carousel images={ images }  />  }
            { images.length > 0  && !embedded &&  <ImageList images={ images }  />  }
            
            <div className='card-action center' style={{ clear: 'both' }} > 
              { !embedded && <Pagination items={ numFound } onChangePage={this.onChangePage}  / > } 
            </div> 
          </div>
          <div className="card-reveal grey-text text-darken-4">
            <span className='card-title'>Image Sources<i className='material-icons right'>close</i></span>
              <ul>{ sources.map( (source, i) => <li key={i}><ImageGallerySource source={source}  /></li> ) }</ul>
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
