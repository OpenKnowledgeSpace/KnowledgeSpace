import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

import PreloaderCircle from '../shared/preloader_circle';

class TermSummary extends Component {  

  constructor(props) {
    super(props);
    this.state = { preloader: true, content:  '', source_link: '' }; 
    this.getDescription = this.getDescription.bind(this); 
  }
 
  getMarkdown(curie) {
    curie = curie || this.props.curie; 
    let url = '/api/terms/' + curie + "/description";
    axios.get(url)
      .then( function(response) {
        let body = response.data.description,
          source_url = response.data.url;
        // We've gotten a pointer to another markdown file in GH. Retry. 
        if ( /^..\/(.*)\.md$/.test(body) ) { 
          let redirect = body.match(/^..\/(.*)\.md$/)[1].replace("/", ":");
          this.getMarkdown(redirect); 
        } else {  
          source_url = source_url.replace("raw.githubusercontent.com", "github.com")
                        .replace('master', 'blob/master');
          let source_text = response.data.source,
            source_link = <p><a target="_blank" href={  source_url } >Definition on { source_text }</a></p>;
          this.setState({  content: body, preloader: false, source_link: source_link } ) 
        } 
      }.bind(this) )
      .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }

  componentDidMount() {
    this.getMarkdown();  
  }

  getDescription() {
    let { content } = this.state; 
    if ( /<[a-z][\s\S]*>/i.test(content) ) { 
      return ( <div dangerouslySetInnerHTML={{ __html: content}} / > )
    } else {
      return ( <ReactMarkdown source={content} / > )
    } 
  }


  render() {
    let classes = this.props.classes; 
    let preloader =  this.state.preloader,
       prov = this.state.source_link,
      description = this.getDescription(); 
    
    return (
    <div className={classes} id='summary'> 
      <div className="card horizontal">
        <div className="card-content term-summary-card"> 
          <span className="card-title activator" style={{ width: '100%' }}>Summary<i className="material-icons right">more_vert</i></span> 
          <PreloaderCircle enabled={ preloader } style={{ left: "40%", margin: '41px 0'  }} /> 
          <div className='flow-text description-text'> { description } </div> 
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
