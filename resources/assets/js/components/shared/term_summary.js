import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

import PreloaderCircle from '../shared/preloader_circle';

class TermSummary extends Component {  

  constructor(props) {
    super(props);
    this.state = { preloader: true, content:  '' }; 
  }
 
  getMarkdown(curie) {
    curie = curie || this.props.curie; 
    let url = '/api/terms/' + curie + "/description";
    axios.get(url)
      .then( function(response) {
        let body = response.data;
        if ( /^..\/(.*)\.md$/.test(body) ) { 
          let redirect = body.match(/^..\/(.*)\.md$/)[1].replace("/", ":");
          this.getMarkdown(redirect); 
        } else {  
          this.setState({  content: body, preloader: false } ) } 
      }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );

  }

  componentDidMount() {
    this.getMarkdown();  
  }

  getSummaries() {
    if ( this.state.content  ) {
      return (  <ReactMarkdown source={this.state.content} /> )
    } else { return null }
  }

  render() {
    let classes = this.props.classes; 
    let preloader =  this.state.preloader;

    return (
    <div className={classes} id='summary'> 
      <div className="card horizontal blue-grey darken-1">
        <div className="card-content white-text term-summary-card"> 
          <span className="card-title activator white-text" style={{ width: '100%' }}>Summary<i className="material-icons right">more_vert</i></span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%"  }} /> 
          <div className='flow-text'><ReactMarkdown source={this.state.content} /></div> 
        </div> 
        <div className="card-reveal grey-text text-darken-4">
          <span className='card-title'>Summary<i className='material-icons right'>close</i></span>
          <p>Some provenance information will go here?</p>
        </div>      
      </div>
    </div>
    )
  }

}

const defaultProps = {
  classes: "col m8 s12 scrollspy",
}
TermSummary.defaultProps = defaultProps;

export default TermSummary;
