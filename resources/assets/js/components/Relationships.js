import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tree, treeUtil } from 'react-d3-tree';
import { json } from 'd3';
import uuid from 'uuid';

class Relationships extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      zoomable: false, 
      scaleExtent: { min: 0.1, max: 1 } 
    };
    this.handleClick = this.handleClick.bind(this); 
  }

  handleClick() {
    if ( this.state.zoomable) {
      this.setState({zoomable: false, scaleExtent: { min: 0.1, max: 1 }}); 
    } else { 
      this.setState({zoomable: true, scaleExtent: { min: 0.2, max: 1 }}); 
     }
  }

  graphJSONToD3(graph) {
    const nodesByCurie = {};
   
    /* this assigns the node. good name, eh? 
     * We can eventually come back and assign attributes
     * but right now lets just not */
    const assignNode = (curie, attributes) => {
      if (!nodesByCurie[curie]) {
        nodesByCurie[curie] = {
          name: attributes.lbl,
          attributes: {},
        };
      }
      return nodesByCurie[curie];
    };
 
   
    /* first we go thru and get all the nodes into a nice list */
    graph.nodes.forEach((node) => {
      assignNode(node.id, node); 
    });
    
    /* now we go through all the subClassOf relationships ... */
    graph.edges.forEach((edge) => {
      if ( edge.pred === 'subClassOf' ) {
        
        edge.source = nodesByCurie[edge.obj];
        edge.target = nodesByCurie[edge.sub];

        const parent = edge.source;
        const child = edge.target;

        parent.id = uuid.v4();
        child.id = uuid.v4();


        child.parent = parent.name || null;
     
        parent._children ? parent._children.push(child) : parent._children = [child];
      }

    });
    const root = graph.edges.filter((edge) => edge.source && !edge.source.parent );
    return [root[0].source];
  }

  componentWillMount() {
    new Promise((resolve, reject) => {
      json("/api/graph/" + this.props.curie, (data) => { resolve( this.graphJSONToD3(data) ) ; })
    }) 
    .then((data) => {
      this.setState( { data: data } ); 
    })
    .catch((err) => console.error(err));
  }

  render() {
    var styles = { 
      links: {
        fill: 'none',
        stroke: '#ccc',
        strokeWidth: '1.5px'
      },
      nodes: {
        leafNode: {
          circle: { 
            cursor: 'pointer',
            fill: '#fff',
            stroke: 'steelblue',
            strokeWidth: '1.5px'
          }
        },
        node: { 
          name: {
            fontSize: "18px", 
            textAnchor: "end",
            fontFamily: '"Helvetica Neue", Helvetica',
          }, 
          circle: { 
            cursor: 'pointer',
            fill: '#fff',
            stroke: 'steelblue',
            strokeWidth: '1.5px'
          } 
        },
      }
    };
    
    var zoomer = this.state.zoomable == true ? (<span className="blue badge white-text" onClick={ this.handleClick } >Zoom Enabled</span>)
                                             : ( <span className="red badge white-text" onClick={ this.handleClick } >Enable Zoom</span> )
    
    return (
    <div className="col m8 s12"> 
      <div className="card grey lighten-4"> 
          <div id="relationships" className='card-content'>
            <span className='card-title'>Relationships {zoomer}</span>
            <div id="treeWrapper" style={{ height: '585px'}} >
              { this.state.data && <Tree data={this.state.data } zoomable={ this.state.zoomable } 
                scaleExtent={ this.state.scaleExtent } 
                translate={ { x: 75, y: 292 } }  depthFactor={ 0 }  styles={ styles }  />}
            </div>
          </div>
      </div>
    </div>
    );
  }




}

export default Relationships;

if (document.getElementById('relationships-box')) {
  const el = document.getElementById('relationships-box') 
  ReactDOM.render( <Relationships curie={ el.attributes['data-curie'].value } />, document.getElementById('relationships-box'));
}
