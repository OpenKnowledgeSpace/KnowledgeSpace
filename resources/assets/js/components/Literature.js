import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Article from "./Article";
import Histogram from "./Histogram";

class Literature extends Component {  

  constructor(props) {
    super(props);
    this.state = { articles: [], years: [[ 1900, 0 ], [ 2020, 0 ]] };
		props;
  }
  
  componentWillMount () { 
		var _this = this; 
    $.ajax({ url: '/api/terms/' + _this.props.curie,
             dataType: 'json', 
    }).then( function( data ){ 
      var terms = data.synonyms.map( function(s) { return "terms[]=" + s } ); 
      $.ajax({ url: '/api/literature?' + terms.join("&"),
               dataType: 'json', 
               success: function(data) { 
                _this.setState({ articles: data.response.docs }); 
								_this.setState({ years: data.facet_counts.facet_fields.year });
               }
      });
    });
  }

  render() {
    return (
      <div className='container'> 
        <section id="literature"> 
          <h3>Literature</h3>
          <ul className="nav nav-tabs"> 
            <li role='presentation' className='active'><a data-toggle='tab' href='#most-recent'>Most Recent</a></li>
            <li role='presentation'><a data-toggle='tab' href='#year-graph'>Year Graph</a></li>
          </ul> 
          <div className='tab-content'> 
            <div id="most-recent" className="tab-pane fade active in"> 
              <ul id='articles' >
                { this.state.articles.map( function(article, i) { 
                  return <Article key={i} article={article} /> 
                })}
              </ul>
            </div>
            <div id="year-graph" className="tab-pane fade"> 
              <div id="histogram-container">
								<Histogram data={ this.state.years.sort().filter( (d) => d[0] > 1970  ) } />
              </div>
            </div>
          </div>
        </section>
      </div> 
    )}

}

export default Literature;

if (document.getElementById('literature-box')) {
  const el = document.getElementById('literature-box') 
  ReactDOM.render( <Literature curie={ el.attributes['data-curie'].value } />, el );
}
