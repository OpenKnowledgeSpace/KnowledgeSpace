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
          this.setState({  content: body, preloader: false, source_curie: curie } ) } 
      }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );

  }

  componentDidMount() {
    this.getMarkdown();  
  }

  getProvenance() {
    let source_curie = this.state.source_curie || null;
    if ( source_curie == null )  { return null }
    let source_url = source_curie.replace(":", "/") + ".md";
    return(<p><a target="_blank" href={ 'https://github.com/OpenKnowledgeSpace/ksdesc/blob/master/' + source_url } >Definition on Github</a></p>)
  }

  render() {
    let classes = this.props.classes; 
    let preloader =  this.state.preloader;
    let prov = this.getProvenance();
    return (
    <div className={classes} id='summary'> 
      <div className="card horizontal">
        <div className="card-content term-summary-card"> 
          <span className="card-title activator" style={{ width: '100%' }}>Summary<i className="material-icons right">more_vert</i></span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%", margin: '41px 0'  }} /> 
          <div className='flow-text'><ReactMarkdown source={this.state.content} /></div> 
        </div> 
        <div className="card-reveal grey-text text-darken-4">
          <span className='card-title'>Summary<i className='material-icons right'>close</i></span>
          { prov } 
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
