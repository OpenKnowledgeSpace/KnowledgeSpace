import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Table from '../shared/table';
import Pagination from '../shared/pagination';
import Category from "./category";

 
const defaultProps = {
  categories: [ "Organism", "Disease", "Anatomical", 
                "Technique","Biological Process", "Cell","Subcellular", "Quality", 
                 "Institution", "Resource"
              ]
}

class CategoryPage extends Component {  

  constructor(props) {
    super(props);
    this.state = { results: [], pageOfResults: [], page: 1, activeCategory: this.props.categories[0], preloader: true  }; 
    
    this.onChangePage = this.onChangePage.bind(this); 
    this.onChangeCategory = this.onChangeCategory.bind(this); 
    this.getCategoryList = this.getCategoryList.bind(this); 
    this.getRows = this.getRows.bind(this); 
  }

  getCategories() { 
    var changePage = this.onChangePage; 
    var snake_cat = this.state.activeCategory.toLowerCase().replace(/\s/g, "_"); 
    
    axios.get('/api/categories/' + snake_cat)
      .then( function(response) { 
        this.setState({ results: response.data.terms }, () => changePage(1)  );
        }.bind(this))
  }
  
  

  onChangeCategory(category) { 
    if ( this.state.activeCategory !== category ) { 
      this.setState({activeCategory: category, preloader: true }, this.getCategories ) 
       
    }
   }

  onChangePage(page) {
    if (  !isNaN(page) ) { 
      let offset = page * 20;
      let pageOfResults = this.state.results.slice(offset, offset + 20);
      this.setState({ page: page, pageOfResults: pageOfResults } );
    }
  }
 
  
  componentWillMount () { 
   this.getCategories(); 
  }

  getCategoryList(cat, i) {
    var activeCategory = this.state.activeCategory;   
    return( <Category key={i} label={cat} activeCategory={ activeCategory } onChangeCategory={ this.onChangeCategory  } preloader={ this.state.preloader } />  ) 
  }

  getRows(row, i) {
    let term = Object.keys(row)[0];
    let desc = { __html: Object.values(row)[0] };

    return(
      <tr key={i}>
        <td>{term}</td><td dangerouslySetInnerHTML={desc}></td>
      </tr>  
     )
  
  }


  render() {
    let catList = this.props.categories.map( this.getCategoryList ),
      rows = this.state.pageOfResults.map( this.getRows ); 
    
    return( 
    <div className="" id="categories-page"> 
      <div className='section'> 
        <div className="row"> 
          <div className="row"> 
            <h2 className='col s12 page-title'>Categories</h2> 
          </div> 
          <div className="row"> 
	          <ul className="categories-list center">{ catList }</ul> 
          </div> 
        </div> 
	    </div>	
      <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <table className='highlight'>
                <thead>
                  <tr>
                      <td>Term</td><td>Curie</td>
                  </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
              </table>
              <div className='card-action center'> 
                  <Pagination items={ this.state.results.length } onChangePage={this.onChangePage}  / > 
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div> 
    );
  }

}

export default CategoryPage;
CategoryPage.defaultProps = defaultProps;

if (document.getElementById('category-page')) {
  const el = document.getElementById('category-page') 
  ReactDOM.render( <CategoryPage />, el );
}
