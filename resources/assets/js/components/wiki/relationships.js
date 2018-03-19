import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import Preloader from '../shared/preloader';
import TreeView from 'react-treeview';

class Relationships extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      preloader: true
    };
    this.nodeToLeaf = this.nodeToLeaf.bind(this); 
  }

  parseGraphJSON(graph) {
    const nodesByCurie = {};
   
    /* this assigns the node. good name, eh? 
     * We can eventually come back and assign attributes
     * but right now lets just not */
    const assignNode = (curie, attributes) => {
      if (!nodesByCurie[curie]) {
        nodesByCurie[curie] = {
          name: attributes.lbl,
          curie: curie, 
          
          attributes: attributes,
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
    return root[0].source;
	}


  componentDidMount () { 
    let url = '/api/graph/' + this.props.curie;
    axios.get(url).then( function(response) { this.setState({data: this.parseGraphJSON( response.data ), preloader: false}) }.bind(this) )
      .catch( function(error) {  this.setState( { preloader: false }) }.bind(this) );
  }

  // This turns a SciGraph JSON node into a TreeView leaf.
  nodeToLeaf(node) {
    if ( typeof node == 'undefined' ) { return "" } 
    if ( node._children ) { 
      let label = <span className='node'><a href={ '/wiki/' + node.curie }>{node.name}</a></span>;
      return (
        <TreeView nodeLabel={label} key={node.id} defaultCollapsed={false}>
          { node._children.map( (child) => this.nodeToLeaf(child) ) } 
        </TreeView>
      ) 
    } else { 
      let div = <div className="info" key={node.id}><span className="" style={{ paddingRight: "5px"}}>●</span><a href={ '/wiki/' + node.curie }>{node.name}</a></div> 
      return ( div )
    }
  } 

  render() {
    let preloader = this.state.preloader; 
    let tree = this.nodeToLeaf(this.state.data);
     
    return (
    <div className="col m12 s12 scrollspy" id="relationships"> 
      <div className="card grey lighten-4"> 
          <div id="relationships" className='card-content'>
            <span className='card-title'>Relationships</span>
            <Preloader enabled={ preloader }  wrapperStyle={{ width: '99%', margin: 'auto', padding: '6px' }} />
            { tree } 
					</div>
      </div>
    </div>);
  }

}

export default Relationships;
