import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../shared/pagination';
import Table from '../shared/table';

class DataSpaceResults extends Component {  


  render() { 
    let numFound = this.props.numFound,
      results = this.props.results,
      onChangePage = this.props.onChangePage,
      columns = this.props.columns,
      preloader = this.props.preloader;


    // This gets bound to the table row.
    let handleRowClick = function() {
      let distro =  this.props.row.access  ||  
                    this.props.row.datasetDistributions || 
                    this.props.row.pr_nlx_154697_8  ||
                    this.props.row.dataset  || 
                    this.props.row.Data || null;
    
      if ( distro instanceof Array ) {
        distro = distro.find( (distro) => distro.accessURL || distro.downloadURL || distro.landingPage || distro.ref_link || distro.study_url );
      }
      let url = distro.accessURL || distro.downloadURL || distro.landingPage || distro.ref_link || distro.study_url; 
      // hack to fix some CIL urls which have unwanted text.. 
      url = url.replace('Cell Image Library Dataset CIL:', '') 
      if ( distro ) { window.open( unescape(url),  '_blank' ); }
    }
    
    return(   
    <div className='row'>
        <div className="col m12 s12"> 
          <div className="card">
            <div className="card-content">
              <span className="card-title activator">Data Space</span> 
              <Table columns={ columns } rows={ results } handleRowClick={ handleRowClick } preloader={ preloader } />
              <div className='card-action center'> 
                <Pagination items={ numFound } onChangePage={ onChangePage }  / > 
              </div> 
            </div>
          </div>
        </div>
      </div>)
  }
}

export default DataSpaceResults;
