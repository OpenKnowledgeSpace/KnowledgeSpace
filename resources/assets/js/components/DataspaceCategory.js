import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DataspaceCategory extends Component {  

  constructor(props) {
    super(props);
    this.state = { count: 0, term: this.props.term, results: {} }; 
  }

  sanitizeTerm ( ) { 
    return this.state.term.replace(/\ cell|\ neuron$/g, ''); 
  }
  
	componentDidUpdate() { 
 		$('.modal:not(.init)').addClass('init').modal(); 
	}

  componentDidMount () { 
      this.props.sources.forEach( function(source) {
				let curie = source.curie; 
        $.ajax({ url: '/api/dataspace/' + curie + '?q=' + this.sanitizeTerm() ,
                 dataType: 'json', 
        }).then( function(data) { 
                    const count = this.state.count; 
                    const resultCount = data.result.resultCount || 0;  
                    const results = this.state.results;
                    results[curie] = count;
                    this.setState({ results: results });
                    this.setState({ count: count + resultCount }); 
                 }.bind(this))
      }.bind(this));
  }

  render() {
		var _this = this; 
		var dsList =  this.props.sources.map( function( source, i) { 
									return ( 
										<li key={i} className='collection-item'>
											<span className='title'>
                        <a href={ '/data_space?data_source=' + source.curie + '&curie=' + _this.props.termCurie }>{source.source_name}</a>
                      </span>
											<span className='secondary-content'><span className='new badge red' data-badge-caption="Records Found">{ _this.state.results[source.curie] }</span></span>	
											<p className='flow-text description' dangerouslySetInnerHTML={ { __html:  source.description } } />
										</li>)
								}); 
    return (
      <li> 
        <a className="btn blue lighten-3 dataspace-category clearfix valign-wrapper waves-effect waves-light modal-trigger" href={ "#" + this.props.category}>
          <span className='left'>{this.props.category}</span><span className='badge category-counter right'>{this.state.count}</span>
        </a>
        <div id={this.props.category} className="modal bottom-sheet">
    			<div className="modal-content">
						<h3>{this.props.category} Data Space 
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
      </li> 
    )}

}

export default DataspaceCategory;
