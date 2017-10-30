import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Article from "./article";
import LineChart from "./line_chart";

import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

class Literature extends Component {  

  constructor(props) {
    super(props);
    this.state = { articles: [], years: [[ 1900, 0 ], [ 2020, 0 ]],
      numFound: 0, labels: [], page: 1, preloader: true };
    this.getResultsFromScicrunch = this.getResultsFromScicrunch.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
 
  
  }

  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, articles: [] },  this.getResultsFromScicrunch );
  }

  // this uses a list of terms to get results from scicrunch.
  getResultsFromScicrunch(terms) {
      terms = terms || this.props.terms;
      terms = terms.map( function(s) { return "terms[]=" + s } );
      let size = this.props.per_page;
      // a funny solr thing. if we're on page 1 we start a item 0  
      let from = '&from=' + ( size * ( this.state.page - 1 ) );
      let url = '/api/literature?' + terms.join("&") + "&size=" + size + from;      
      axios.get(url).then( function(response) { 
                                  this.setState({
                                      articles: response.data.hits.hits,
                                      numFound: response.data.hits.total,
                                      queryTerms: terms,  
                                      years: [...Array(37).keys()].map( (k ) => { return [ 1970+k, Math.floor((Math.random() * 10000) + 1) ] } ),
                                      preloader :false })
                                  }.bind(this))
        .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }

  componentWillReceiveProps(nextProps) { 
    if ( nextProps.terms.length > 0 && nextProps.terms !== this.props.terms ) {
      this.getResultsFromScicrunch(nextProps.terms); 
    }	
  }
 
  componentDidMount() {
    if  ( this.props.terms && this.props.terms.length > 0 ) { 
      this.getResultsFromScicrunch(); 
    }
  }

  getArticles() { 
    return this.state.articles.map( function(article, i) { 
                  return <Article key={i} article={article} /> 
      });
  }


	render() { 
    let classes = this.props.classes,
      articles = this.getArticles(),
      embedded = this.props.embedded, 
      preloader = this.state.preloader,
      queryTerms = this.state.queryTerms || [];
    
    return (
        <div className="col m12 s12 scrollspy" id='literature'> 
          <div className="card">
            <div className="card-content">
              <span className="card-title activator">Literature<i className="material-icons right">insert_chart</i></span> 
              <Preloader enabled={ preloader }  wrapperStyle={{ bottom: '-100px' }}  /> 
              <ul id='articles' className="collection" >
                { articles } 
              </ul>
              <div className='card-action center'> 
              {  embedded  &&  <a href={ '/literature?' + queryTerms.join('&') } 
                  className="embedded-only btn-floating right btn-large waves-effect waves-light red">
                  <i className="material-icons">more</i></a> }
                <Pagination items={ this.state.numFound } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
            <div className="card-reveal grey-text text-darken-4">
                <span className='card-title'>Literature<i className='material-icons right'>view_list</i></span>
                <div id="line-chart">
                  <LineChart data={ this.state.years.sort().filter( (d) => d[0] > 1970  ) } />
                </div>
            </div>      
          </div>
        </div>
    )}
}

const defaultProps = {
    classes: 'col m12 s12',
    per_page: 20, embedded: true
}
Literature.defaultProps = defaultProps;
export default Literature;
