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
      <div className='container'> 
        <div className="row"> 
          <h1 className='col-md-12'>{ this.state.labels ? this.state.labels[0] : "" }</h1> 
        </div> 
        <div className="row"> 
          <div className='col-md-9'> 
            <section id="summary">
              <h3>Summary</h3>
              <div className='row'> 
                <div className='form-group'>
                  <label className="col-sm-2">Definition:</label>
                  <div className="col-sm-9 label-only">{ this.state.definitions ? this.state.definitions[0] : "" }</div>
                </div>
              </div> 
            </section>
            <section id="lexicon">
              <h3>Lexicon</h3>
              <div className='row'> 
                <div className='form-group'>
                  <label className="col-sm-2">Concept URI:</label>
                  <div className="col-sm-9 label-only"><a href={ this.state.iri ? this.state.iri : '' } target='_blank'>{ this.state.iri ? this.state.iri : '' }</a></div>
                </div>
              </div> 
              <div className='row'> 
                <div className='form-group'>
                  <label className="col-sm-2">Labels:</label>
                  <div className="col-sm-9 label-only">
                    <List items={this.state.labels} name='labels' /> 
                  </div> 
                </div>
              </div> 
              <div className='row'> 
                <div className='form-group'>
                  <label className="col-sm-2">Synonyms:</label>
                  <div className="col-sm-9 label-only">
                      <List items={this.state.synonyms} name='synonyms' /> 
                  </div> 
                </div>
              </div> 
            </section>
          </div> 
          <div className='col-md-3'>
              <Dataspace terms={this.state.labels} /> 
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
