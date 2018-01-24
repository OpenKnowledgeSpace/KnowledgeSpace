import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DataSpace from './data_space';
import Lexicon from './lexicon';
import Literature from '../literature/literature';
import Relationships from './relationships';
import ImageGallery from './image_gallery';

import TermSummary from '../shared/term_summary';
import Preloader from '../shared/preloader';


const utils = require( '../../utils.js' );
const axios = window.axios || utils.getAxios(); 

class WikiPage extends Component {  

  constructor(props) {
    super(props);
    this.state = { term: { labels: [], synonyms: [] }, preloader: true }; 
  }

  componentDidMount() { 
    axios.get('/api/terms/' + this.props.curie)
      .then( function(response) { 
        let data = response.data;         
        if ( data.hasOwnProperty('code') ) { return window.location.href = "/not_found"; } 
        this.setState({  term: response.data, preloader: false } ) 
      }.bind(this) )
      .catch( function(error) { return window.location.href = '/not_found'; }.bind(this) );
  }

  subNavBar() { 
		let atlas = this.props.curie.match(/^MBA\:/) ? 
            <li><a href="#atlas">Atlas</a></li> : null; 

    return( 
      <div className="toc-wrapper"> 
        <ul className="section table-of-contents">
          <li><a href="#summary">Summary / Lexicon</a></li>
          <li><a href="#data-space">Data Space</a></li>
          { atlas } 
          <li><a href="#literature">Literature</a></li>
          <li><a href="#relationships">Relationships</a></li>
          <li><a href="#image-gallery">Image Gallery</a></li>
        </ul>
      </div>)
     
    }

	getAtlas() { 
		let curie = this.props.curie;	
		let url = "http://atlas.brain-map.org/atlas?atlas=1&structure=" +  curie.split(':')[1];
		if ( curie.match(/^MBA\:/) ) { 
			return( 
 				<div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <span className="card-title activator">Atlas</span> 
              <iframe src={ url }  width="100%" height="100%"></iframe>
            </div>
          </div> 
				</div> ) } else { return null } 
	}


  render() { 
    let curie = this.props.curie; 
    let term = this.state.term;
    let subNavBar = this.subNavBar();
		let atlas = this.getAtlas();
 
    return (
      <div className='container page-container'> 
        <div className='row'>
          <div className="col hide-on-small-only m3 l2" > 
              { subNavBar } 
          </div>
          <div className="col s12 m9 l10"> 
            <div className="row"> 
                <h2 className='col s12 term-title page-title'>
                  <Preloader enabled={ this.state.preloader } wrapperStyle={{ padding: '3px' }} /> 
                  { term.labels ? term.labels[0] : null }
                </h2> 
            </div>
            <div className="row" id='summary-box'> 
              <TermSummary curie={ curie } /> 
              <Lexicon term={ term } preloader={this.state.preloader} />
            </div>
            <div className='row' id='dataspace'>
              <DataSpace terms={term.labels} curie={ term.curie } preloader={ this.state.preloader } /> 
            </div>
            <div className='row' id='atlas'>
              { atlas } 			
            </div>
            <div className='row' id='literature-box'>
              <Literature terms={ term.labels } per_page={5} />
            </div>
            <div className='row' id='relationship-box'>
              <Relationships curie={ curie } /> 
              <ImageGallery curie={ curie } />
            </div>
          </div> 
        </div>
      </div>
    )}
}

export default WikiPage;
if (document.getElementById('wiki-page')) {
  const el = document.getElementById('wiki-page'); 
  ReactDOM.render( <WikiPage curie={ el.attributes['data-curie'].value } />, document.getElementById('wiki-page'));
}
