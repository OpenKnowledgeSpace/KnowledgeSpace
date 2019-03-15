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

    [ 'v_uuid', 'Image Description', 'Dimension', 'Technical Details' ].forEach( (col) => delete columns[col] )
    
    // I don't think this is being used anymore, since nif services provides a
    // link in the datatable.
    // This gets bound to the table row.
    let handleRowClick = function() {
      let { row } = this.props;
      let uri;

      // DYRAD stores its URIs in the identifiers.ID array.
      if ( row.identifiers && row.identifiers.ID ) {
        uri = row.identifiers.ID.find( (id) => /^https?\:/.test(id) ) 
      }
      
      // if we don't have a URI, we look in the access / dataset related
      // keys... 
      let distro =  row.access  ||  
                    row.datasetDistributions || 
                    row.pr_nlx_154697_8  ||
                    row.dataset  || 
                    row.Data || null;
   
      // sometimes there's multiples of these keys...
      if ( distro instanceof Array ) {
        distro = distro.find( (distro) => distro.accessURL || distro.downloadURL || distro.landingPage || distro.ref_link || distro.study_url );
      }

      // Neuroelectro wants some special stuff here...
      if ( distro == null && ( 'l2_nlx_151885_data_summary' in row ) ) { 
        distro = true 
        uri = "https://neuroelectro.org/neuron/" + row.l2_nlx_151885_data_summary.n_id     
      // Allen wants some special stuff... 
      } else if ( distro == null && ( 'specimen' in row ) ) {
        distro = true 
        uri = "http://celltypes.brain-map.org/experiment/electrophysiology/" + row.specimen.id     
      } 
      
      
      // Ok, lets find the URL!
      let url = uri || distro.accessURL || distro.downloadURL || distro.landingPage || distro.ref_link || distro.study_url; 
      // hack to fix some CIL urls which have unwanted text.. 
      url = url.replace('Cell Image Library Dataset CIL:', '') 
   
      // some urls dont have the http: ..
      if ( !/^http/.test(url) ) { 
        url = "http://" + url;  
      }
      
      
      if ( distro ) { window.open( unescape(url),  '_blank' ); }
    } // HandleRowClick


    return(   
        <div className="col m9 s12"> 
          <div className="card">
            <div className="card-content results-card">
              <span className="card-title activator">
                { !preloader  && <h6 className="right">{ numFound } Records Found</h6> } 
              </span> 
              <Table columns={ columns } rows={ results } handleRowClick={ handleRowClick } preloader={ preloader } />
              <div className='card-action center'> 
                <Pagination items={ numFound } onChangePage={ onChangePage }  / > 
              </div> 
            </div>
          </div>
      </div>)
  }
}

export default DataSpaceResults;
