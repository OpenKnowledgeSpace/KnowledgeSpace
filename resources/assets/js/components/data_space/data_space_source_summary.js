import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Preloader from '../shared/preloader';

class DataSpaceTermChips extends Component {
  render() {
    if ( this.props.terms.length == 0 ) { return null; }
    let termChips = this.props.terms.map( (entry, i) => (<div key={i} className='chip'><a href={'/wiki/' + entry.curie }>{entry.labels[0]}</a></div>) ),
      label = this.props.terms > 1 ? "Search Terms:" : "Search Term:";
    return (
          <div className='card-action data-space-card-action'> 
                <div className="input-field"> 
                  { termChips }
                </div> 
          </div>
    ) 
  }

}

class DataSpaceSourceSummary extends Component {  

  constructor(props) {
    super(props);
    this.state = { source_name: '', descrpition: '', preloader: true };
  
  }

  /* We get the dataspace information json and find the source we're looking at */  
	componentDidMount() { 
    let curie = this.props.curie,
      sourceFinder = (source) => { return source.curie == curie };
    axios.get('/api/data_space')
      .then( function(response) { 
        let source = [].concat.apply([], Object.values(response.data)).find( (el) => el.curie == curie );
        source.preloader = false; 
        this.setState(source); 
      }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }

  render() {
    let source_name = this.state.source_name, 
      description = this.state.description,
      preloader = this.state.preloader,
      terms = this.props.terms, 
      url = this.state.url;

    return( 
      <div className="row"> 
          <div className='col m12 s12'> 
            <div className="card horizontal red lighten-2" id="summary">
              <Preloader enabled={ preloader } wrapperStyle={{ padding: '6px', margin: 'auto', top: '5px', left: '15px'}}  />
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">
                  <div className='col label-only'>
                    <a style={{ color: 'white', fontWeight: 'bold',textDecoration: 'underline' }} href={ url  } target="_blank">{ source_name }</a>
                  </div> 
                </span> 
                <div className='form-group flow-text'>
                  <div className="col label-only" dangerouslySetInnerHTML={ { __html: description } }></div>
                </div>
                <DataSpaceTermChips terms={terms} />
              </div> 
            </div>
          </div>
      </div>
    
    )
  }

}



const defaultProps = {  };
DataSpaceSourceSummary.defaultProps = defaultProps;
export default DataSpaceSourceSummary;

