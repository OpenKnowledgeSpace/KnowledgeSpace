import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Preloader from '../shared/preloader';

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
      url = this.state.url;

    return( 
      <div className="row"> 
          <div className='col m12 s12'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <Preloader enabled={ preloader } wrapperStyle={{ padding: '6px', margin: 'auto', top: '5px', left: '15px'}}  />
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">
                    <a href={ url  } target="_blank">{ source_name }</a>
                </span> 
                <div className='form-group flow-text'>
                  <div className="col label-only" dangerouslySetInnerHTML={ { __html: description } }></div>
                </div>
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

