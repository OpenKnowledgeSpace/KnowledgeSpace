import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Article from "./article";
import LineChart from "./line_chart";

import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

class Literature extends Component {  

  constructor(props) {
    super(props);
    this.state = { 
      articles: [],
      years: [[ 1900, 0 ], [ 2020, 0 ]],
      numFound: 0, 
      labels: [],
      page: 1,
      preloader: true
    };
    this.getResultsFromScicrunch = this.getResultsFromScicrunch.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
  }

  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, articles: [] },  this.getResultsFromScicrunch );
  }

  // this uses a list of terms to get results from scicrunch.
  getResultsFromScicrunch(terms, keywords = null) {
      // if what's being passed is isn't what's in our props, the user has
      // updated the input, so lets just move on 
      if ( keywords && keywords !== this.props.keywords ) {  return  }    
      this.setState({ preloader: true }); 
      terms = terms || this.props.terms;
      terms = terms.map( function(s) { return "terms[]=" + s } );
      let size = this.props.per_page;
      // a funny solr thing. if we're on page 1 we start a item 0  
      let from = '&from=' + ( size * ( this.state.page - 1 ) );
      let url = '/api/literature?' + terms.join("&") + "&size=" + size + from;      

      if ( keywords ) {
        url = url + "&keywords[]=" + keywords; 
      }
      let yearsFromDates = function(arrayOfDates)  { 
        let years = {};
        arrayOfDates.forEach( (h, i) => { 
          let year = h.key.slice(0,4)
          if ( years[year] ) {
            years[year] = years[year] + h.doc_count
          } else { 
            years[year] = h.doc_count 
           }
        });
        return Object.keys(years).map( (year) => [ year, years[year] ] );
       }

      axios.get(url).then( function(response) { 
        this.setState({
            articles: response.data.hits.hits,
            numFound: response.data.hits.total,
            queryTerms: terms,  
            years: yearsFromDates(response.data.aggregations.pub_year.buckets),
            preloader: false
        })
        }.bind(this))
        .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
  }

  componentWillReceiveProps(nextProps) {
    let terms = false, keywords = false
    
    if ( nextProps.terms !== this.props.terms ) { terms = nextProps.terms }
    if ( nextProps.keywords !== this.props.keywords ) { keywords = nextProps.keywords }
    
    if (  terms || keywords ) {
      setTimeout( ()=>  this.getResultsFromScicrunch(terms,keywords ), 1000);
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
              <span className="card-title">Literature  ( { this.state.numFound } record found )
                <i className="material-icons activator right">insert_chart</i>
                {  embedded  &&  <a href={ '/literature?' + queryTerms.join('&') } 
                  className="embedded-only  right waves-effect waves-light">
                  <i className="material-icons">search</i></a> }
              </span> 
              <ul id='articles' className="collection" >
                { preloader && <li><Preloader enabled={ preloader }  wrapperStyle={{ top: '80px', width: '99%', margin: 'auto', padding: '6px' }}  /></li>  }
                { !preloader && articles } 
              </ul>
              <div className='card-action center'> 
                <Pagination items={ this.state.numFound } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
            <div className="card-reveal grey-text text-darken-4">
                <span className='card-title'>Literature<i className='material-icons right'>view_list</i>
                  <a href={ '/literature?' + queryTerms.join('&') } className="embedded-only  right waves-effect waves-light">
                    <i className="material-icons">search</i>
                  </a> 
                </span> 
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
  per_page: 20,
  embedded: true
}
Literature.defaultProps = defaultProps;
export default Literature;
