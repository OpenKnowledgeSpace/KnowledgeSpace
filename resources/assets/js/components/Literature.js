import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Article from "./Article";
import Histogram from "./Histogram";
import Pagination from "./Pagination";

class Literature extends Component {  

  constructor(props) {
    super(props);
    this.state = { articles: [], years: [[ 1900, 0 ], [ 2020, 0 ]], numFound: 0, labels: [] };
    this.state.per_page = this.props.embedded ? 5 : 20; 
    this.getResultsFromScicrunch = this.getResultsFromScicrunch.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
  }

  onChangePage(page) {
    this.setState({ page: page },  this.getResultsFromScicrunch );
  }

  // this uses a list of terms to get results from scicrunch.
  getResultsFromScicrunch() { 
		  var _this = this; 
      var terms = _this.state.synonyms.map( function(s) { return "terms[]=" + s } ); 
      var size = _this.state.per_page;
      // a funny solr thing. if we're on page 1 we start a item 0  
      var from = '&from=' + ( size * ( this.state.page - 1 ) );
      $.ajax({ url: '/api/literature?' + terms.join("&") + "&size=" + size + from,
               dataType: 'json', 
               success: function(data) { 
                _this.setState({ articles: data.hits.hits });
                _this.setState({ numFound: data.hits.total });
								_this.setState({ years: data.facet_counts.facet_fields.year });
               }
      });
  }

  componentWillMount () { 
		var _this = this; 
    // First we use the provided curie to get a list of synonyms to q scicrunch 
    $.ajax({ url: '/api/terms/' + _this.props.curie,
             dataType: 'json', 
    }).then( function(data) { 
        data['page'] = 1;
			  _this.setState(data, _this.getResultsFromScicrunch );
		});
	}
  
	render() {
    return (
    <div className={ this.props.embedded ? 'embedded' : 'page'  } id="literature"> 
      <div className="row page-only"> 
          <div className='col'> 
            <div className="card horizontal blue-grey darken-1" id="summary">
              <div className="card-content white-text"> 
                <span className="card-title activator white-text">{ this.state.labels[0] }</span> 
                <div className='form-group'>
                  <label className="col s2">Definition:</label>
                  <div className="col s9 label-only">{ this.state.definitions ? this.state.definitions[0] : "" }</div>
                </div>
              </div> 
            </div>
          </div>
      </div>
      <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <span className="card-title activator">Literature<i className="material-icons right">insert_chart</i></span> 
              <ul id='articles' className="collection" >
                { this.state.articles.map( function(article, i) { 
                  return <Article key={i} article={article} /> 
                })}
              </ul>
              <div className='card-action center'> 
                <a href={ '/literature?curie=' + this.props.curie } className="embedded-only btn-floating right btn-large waves-effect waves-light red"><i className="material-icons">more</i></a>
                <Pagination items={ this.state.numFound } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
            <div className="card-reveal grey-text text-darken-4">
                <span className='card-title'>Literature<i className='material-icons right'>view_list</i></span>
                <div id="histogram-container">
                  <Histogram data={ this.state.years.sort().filter( (d) => d[0] > 1970  ) } />
                </div>
            </div>      
          </div>
        </div>
      </div>
     </div>
    )}
}

export default Literature;

if (document.getElementById('literature-box')) {
  const el = document.getElementById('literature-box') 
  ReactDOM.render( <Literature curie={ el.attributes['data-curie'].value } 
  page={ parseInt( el.attributes['data-page'].value ) } 
  embedded={ el.attributes['data-embedded'].value } />, el );
}
