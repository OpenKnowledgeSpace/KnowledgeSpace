import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Pagination from './Pagination';
import Category from "./Category";



 
const defaultProps = {
  categories: [ "Organism", "Disease", "Anatomical", 
                "Technique","Biological Process", "Cell","Subcellular", "Quality", 
                 "Institution", "Resource"
              ]
}

class Categories extends Component {  

  constructor(props) {
    super(props);
    this.state = { results: [], pageOfResults: [], page: 1, activeCategory: this.props.categories[0]  }; 
    
    this.onChangePage = this.onChangePage.bind(this); 
    this.onChangeCategory = this.onChangeCategory.bind(this); 
    this.getCategoryList = this.getCategoryList.bind(this); 
    this.getRows = this.getRows.bind(this); 
  }

  getCategories() { 
    var changePage = this.onChangePage; 
    var snake_cat = this.state.activeCategory.toLowerCase().replace(/\s/g, "_"); 
    
    $.ajax({ url: '/api/categories/' + snake_cat,
               dataType: 'json', 
               success: function(data) { 
                this.setState({ results: data.terms }, function() { changePage(1); } );
               }.bind(this)
    });
  
  
   }
  

  onChangeCategory(category) { 
    if ( this.state.activeCategory !== category ) { 
      this.setState({activeCategory: category}, this.getCategories ) 
       
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
    return( <Category key={i} label={cat} activeCategory={ activeCategory } onChangeCategory={ this.onChangeCategory  } />  ) 
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
    var catList = this.props.categories.map( this.getCategoryList );
    var rows = this.state.pageOfResults.map( this.getRows ); 
    
    return( 
    <div className="" id="categories-page"> 
      <div className='section'> 
        <div className="row"> 
          <div className="row"> 
            <h2 className='col s12 term-title'>Categories</h2> 
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
                      <td>Term</td><td>Curie or Description?</td>
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

export default Categories;
Categories.defaultProps = defaultProps;

if (document.getElementById('categories')) {
  const el = document.getElementById('categories') 
  ReactDOM.render( <Categories />, el );
}
