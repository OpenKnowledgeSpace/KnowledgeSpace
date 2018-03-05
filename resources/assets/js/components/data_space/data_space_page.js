import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Pagination from "../shared/pagination";
import Preloader from '../shared/preloader';

import DataSpaceSourceSummary from './data_space_source_summary';
import DataSpaceResults from './data_space_results';

class DataSpaceSearch extends Component {
  render() {
    return (
    <div className='search'>
      <div className='search-wrapper input-field'>  
        <i className='material-icons prefix'>search</i> 
        <input ref='query' type='text' className='form-control' name='query' placeholder='Keyword Search' onChange={ this.props.submitQuery } /> 
      </div> 
    </div>
    ) 
  }
}

class DataSpacePage extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { results: [], numFound: 0, preloader: true, keywords: "" };
    this.getResultsFromDataSpace = this.getResultsFromDataSpace.bind(this); 
    this.onChangePage = this.onChangePage.bind(this); 
    this.keywordQuery = this.keywordQuery.bind(this); 
  }
  
  // this uses a list of terms to get results from this data space.
  getResultsFromDataSpace(curie, terms) {
    this.setState({ preloader: true });  
    curie = curie || this.props.curie;   
    terms = terms || this.props.terms;
    terms = terms.map( function(s) { return "terms[]=" + s } );
     
    let size = this.props.per_page,
      keywords = "&keywords[]=" + this.state.keywords, 
      page = this.props.page || 1,
      from = '&from=' + ( size * ( page - 1 ) ),
      url = '/api/data_space/' + curie + '?' + terms.join("&") + "&size=" + size + from + keywords ;     
    axios.get(url).then( function(response) { 
                                  this.setState({
                                      page: page, 
                                      results: response.data.hits.hits.map((el) => el._source ),
                                      numFound: response.data.hits.total,
                                      preloader: false })
                                  }.bind(this))
        .catch( function(error) {  this.setState( { notFound: true }) }.bind(this) );
   }
 
  onChangePage(page) {
    if ( this.state.page == page ) { return null } 
    this.setState({ page: page, preloader: true, results: [] },  this.getResultsFromDataSpace );
  }

  // This is total garbage. Need to refactor this out..
  getColumns() {
    switch(this.props.curie) {
      default: 
        return { 
          'dataset.title': "Title",
          'dataset.creators': 'Creators',
          'dataset.availability': 'Availability',
          'dataset.dateReleased': "Release Date",
        };
      case 'neuromorpho_20171102':
        return {
          'molecularEntity.name': "Cell Class",
          'anatomicalPart.name': 'Brain Region',
          'taxonomicInformation.name': "Organism",
          'taxonomicInformation.strain': "Strain",
          'activity.name': "Activity",
          'dataset.availability': 'Availability',
        }
      case 'ks_ic_20160916':
        return {
          "pr_nlx_154697_8.database": 'Database',
          "pr_nlx_154697_8.con_from": 'Connected From',
          "pr_nlx_154697_8.con_to": 'Connected To',
          "pr_nlx_154697_8.projection_strength": 'Projection Strength',
          "pr_nlx_154697_8.species": 'Species',
          "pr_nlx_154697_8.notes": 'Notes',
        }
      case 'dataverse_20160229':
        return { 
          'dataset.title': "Title",
          'person.name': 'Creators',
          'dataset.description': "Description",
         }
      case 'dryad_20170811':
        return { 
          'dataset.title': "Title",
          'dataset.keywords': 'Keywords',
          'dataset.description': "Description",
         }
      case 'gemma_20171102':
        return { 
          'dataset.title': "Title",
          'dataset.description': 'Description',
          'dataset.availability': 'Availability',
        }
      case "neurosynth_20151112":
        return {
          "Data.title": 'Title',
          "Data.organism": "Organism", 
          "Data.reference": 'Reference',
        }
      case 'cil_20160627':
        return { 
          'dataset.description': 'Description',
          'dataset.types': "Types",
          'dataset.dimensions': "Dimensions",
        }
      case 'ks_neuroelectro_20160919':
        return { 
          'l2_nlx_151885_data_summary.n_name': "Name", 
          'l2_nlx_151885_data_summary.e_name': "Property", 
          'l2_nlx_151885_data_summary.e_definition': "Electrophysiology Definition", 
          'l2_nlx_151885_data_summary.value_mean': "Mean Value", 
          'l2_nlx_151885_data_summary.value_sd': "SD", 
          'l2_nlx_151885_data_summary.num_articles': "# of Articles", 
        }
      case 'ks_act_20160916':
        return { 
          'specimen.name': "Name",
          'specimen.donor.sex-full-name': 'Sex',
          'specimen.specimen-tags.specimen-tag.name': 'Specimen', 
          'specimen.structure.name': "Structure" 
         }
      case 'nitrc_ir_20171102':
        return { 
          'dataset.ID': 'ID', 
          'dataset.title': "Dataset Title",
          'dataset.types': "Types",
          'dataset.privacy': "Privacy",
          'dataset.availability': 'Availability'
        }
    } 
  }

  componentWillMount () { 
    this.getResultsFromDataSpace(); 
	}
	
  keywordQuery(event, timeout) {
		let keywords = event.target.value 
		if ( keywords !== this.state.keywords ) { 
      this.setState({keywords}, this.getResultsFromDataSpace ) 
    }
  }

  render() {
    let curie = this.props.curie, 
      results = this.state.results,
      numFound = this.state.numFound,
      columns = this.getColumns(),
      onChangePage = this.onChangePage,
      preloader = this.state.preloader,
      termChips = this.props.terms.map( (term, i) => (<div key={i} className='chip'>{term}</div>) );
    return( 
      <div className='section'>
        <div className="row">
            <h2 className='col s12 page-title'>
              Data Space
            </h2>
        </div>
        <DataSpaceSourceSummary curie={curie} />
        <div className="row"> 
          <div className='col m12 s12'> 
            <div className="card horizontal blue-grey darken-1" id="query">
              <div className="card-content white-text col s12"> 
                <div className="input-field"> 
                  <span>Search Term:</span> { termChips }
                </div> 
                <div id='home-search'>	
                  <DataSpaceSearch submitQuery={ this.keywordQuery } /> 
                </div> 
              </div> 
            </div>
          </div>
        </div>
        <DataSpaceResults results={ results } numFound={ numFound } columns={ columns } onChangePage={ onChangePage } preloader={ preloader } />
      </div>
    )
  }

}



const defaultProps = { per_page: 20 };
DataSpacePage.defaultProps = defaultProps;
export default DataSpacePage;
if (document.getElementById('data-space-page')) {
  const el = document.getElementById('data-space-page'); 
  ReactDOM.render( <DataSpacePage curie={ el.attributes['data-curie'].value }
    terms={ el.attributes['data-terms'].value.split(',') } page={ el.attributes['data-page'].value } />,
    document.getElementById('data-space-page'));
}
