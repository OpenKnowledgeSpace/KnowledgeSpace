import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DataSpace from './data_space';
import Lexicon from './lexicon';
import Literature from '../literature/literature';
import Relationships from './relationships';
import ImageGallery from '../image_gallery/image_gallery';

import TermSummary from '../shared/term_summary';
import Preloader from '../shared/preloader';

const utils = require( '../../utils.js' );
const axios = window.axios || utils.getAxios(); 

class WikiPage extends Component {  

  constructor(props) {
    super(props);
    this.state = { preloader: true }; 
  }

  componentDidMount() {}


  render() { 
    let { curie, entry } = this.props;

    return (
      <div className='container page-container'> 
        <div className='row'>
          <div className="col hide-on-small-only m3 l2" > 
              <SubNav curie={ curie } /> 
          </div>
          <div className="col s12 m9 l10"> 
            <div className="row"> 
                <div className='col s12 term-title page-title'>
                  { entry.labels ? <span className='flow-text'>{entry.labels[0]}</span> : null }
                  { entry.labels[0] && <a className='right search-this-term hide-on-small-only' href={ '/search?redirect=false&q=' + entry.labels[0] } >Search for this term</a> }
                </div> 
            </div>
            <div className="row"> 
              { entry.labels[0] && <a className='center hide-on-med-and-up show-on-small' href={ '/search?redirect=false&q=' + entry.labels[0] } >Search for this term</a> }
            </div> 
            <div className="row" id='summary-box'> 
              <TermSummary curie={ curie } /> 
              <Lexicon term={ entry }  />
            </div>
            <div className='row' id='dataspace'>
              <DataSpace terms={entry.labels} curie={ entry.curie } categories= { this.props.ds_categories  }  /> 
            </div>
            <div className='row' id='atlas'>
              <Atlas curie={ curie } /> 			
            </div>
            <div className='row' id='literature-box'>
              <Literature terms={ entry.labels } curie={ entry.curie } per_page={5} />
            </div>
            <div className='row' id='relationship-box'>
              <Relationships curie={ curie } /> 
            </div>
            <div className='row' id='image-gallery-box'>
              <ImageGallery terms={ entry.labels } curie={ entry.curie } preloader={ this.state.preloader } /> 
            </div>
          </div> 
        </div>
      </div>
    )}
}

class Atlas extends Component {
  render() {
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
				</div> )
    } else {
      return null
    } 
	}
}


class SubNav extends Component {  
  render() { 
		let atlas = this.props.curie.match(/^MBA\:/) ? <li><a href="#atlas">Atlas</a></li> : null; 
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
}

export default WikiPage;
if (document.getElementById('wiki-page')) {
  const el = document.getElementById('wiki-page'); 
  ReactDOM.render( <WikiPage entry={ ENTRY } ds_categories={ DS_CATEGORIES } curie={ el.attributes['data-curie'].value } />, document.getElementById('wiki-page'));
}
