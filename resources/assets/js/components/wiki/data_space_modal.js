import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DataSpaceModalSource extends Component { 
 
  render() { 
    let count = this.props.count, 
      source = this.props.source,
      terms = this.props.terms,
      url = "/data_space/" + source.curie + "?" + terms;

    return ( 
      <li  className='collection-item'>
        <span className='title'>
          <a href={ url }>{source.source_name}</a>
        </span>
        <span className='secondary-content'><span className='new badge red' data-badge-caption="Records Found">{ count }</span></span>	
        <p className='flow-text description' dangerouslySetInnerHTML={ { __html:  source.description } } />
      </li>)
  }

}

DataSpaceModalSource.defaultProps = { count: 0  };



class DataSpaceModal extends Component {  

  render() {
    let category = this.props.category,
      source_count = this.props.source_count,
      terms = this.props.terms;

    var dsList =  this.props.sources.map( function( source, i) { 
      return  <DataSpaceModalSource  key={i} source={ source } count={ source_count[source.curie]  } terms={ terms } />  
    });

    return (
        <div id={ category } className="modal bottom-sheet">
    			<div className="modal-content">
						<h3>{ category.charAt(0).toUpperCase() + category.slice(1) } Data Space 
      				<a href="#!" className="right modal-action modal-close waves-effect waves-green btn-flat">
								<i className="material-icons">close</i>
							</a>
						</h3>
						<ul className='collection'>
							{ dsList }
						</ul>	
					</div>
    			<div className="modal-footer">
    			</div>
  			</div> 
    )}

}

export default DataSpaceModal;
