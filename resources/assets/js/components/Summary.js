import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Dataspace from './Dataspace';
import { Resizable, ResizableBox } from 'react-resizable';

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

class Summary extends Component {  

  constructor(props) {
    super(props);
    this.state = { labels: [], synonyms: [] }; 
  }

  componentWillMount () { 
    $.ajax({ url: '/api/terms/' + this.props.curie,
             dataType: 'json', 
             success: function(data) { 
              this.setState(data); 
             }.bind(this)
    });
  }

  render() {
    return (
      <div className='section'> 
        <div className="row"> 
          <div className="row"> 
            <h2 className='col s12 term-title'>{ this.state.labels ? this.state.labels[0] : "" }</h2> 
          </div> 
          <div className="row"> 
            <nav id='term-nav' className="blue lighten-2">
              <div className="nav-wrapper">
                <ul id="nav-mobile" className="left whide-on-med-and-down">
                  <li><a href="#summary-box">Summary</a></li>
                  <li><a href="#lexicon">Lexicon</a></li>
                  <li><a href="#dataspace">Data Space</a></li>
                  <li><a href="#literature-box">Literature</a></li>
                  <li><a href="#relationships-box">Relationships</a></li>
                  <li><a href="#image-gallery-box">Image Gallery</a></li>
                </ul>
              </div>
            </nav>
          </div> 
        </div>
        <div className="row"> 
          <div className='col m4 s12 right'>
              <Dataspace terms={this.state.labels} termCurie={ this.props.curie } /> 
          </div>
          <div className='col m8 s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">Summary<i className="material-icons right">more_vert</i></span> 
                <div className='form-group'>
                  <label className="col s2">Definition:</label>
                  <div className="col s9 label-only">{ this.state.definitions ? this.state.definitions[0] : "" }</div>
                </div>
              </div> 
              <div className="card-reveal grey-text text-darken-4">
                <span className='card-title'>Summary<i className='material-icons right'>close</i></span>
                <p>Some provenance information will go here?</p>
              </div>      
            </div>
          </div>
          <div className='col m8 s12'> 
            <div className="card horizontal blue-grey darken-1" id="lexicon">
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">Lexicon<i className="material-icons right">more_vert</i></span> 
                <div className='row'>
                      <label className="col s2">Concept URI:</label>
                      <div className="col s9 label-only"><a href={ this.state.iri ? this.state.iri : '' } target='_blank'>{ this.state.iri ? this.state.iri : '' }</a></div>
                </div>
                <div className='row'>
                      <label className="col s2">Labels:</label>
                      <div className="col s9 label-only">
                        <List items={this.state.labels} name='labels' /> 
                      </div> 
                 </div>
                <div className='row'>
                  <label className="col s2">Synonyms:</label>
                  <div className="col s9 label-only">
                          <List items={this.state.synonyms} name='synonyms' /> 
                  </div> 
                </div>
              </div> 
              <div className="card-reveal grey-text text-darken-4">
                <span className='card-title'>Lexicon<i className='material-icons right'>close</i></span>
                <p>Not sure this card needs to flip...</p>
              </div>      
            </div>
          </div>
        </div>
      </div> 
    );
  }
}
export default Summary;

if (document.getElementById('summary-box')) {
  const el = document.getElementById('summary-box') 
  ReactDOM.render( <Summary curie={ el.attributes['data-curie'].value } />, document.getElementById('summary-box'));
}
