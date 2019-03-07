import React, {Component} from 'react'
import {findSlugByCurie} from 'clients/EntityClient'
import { Redirect } from 'react-router'

export default class WikiPage extends Component {
 
  state= { curie: null, slug: null } 

  componentDidMount() {
    const { curie } = this.props.match.params;
    findSlugByCurie(curie).then( function(slug) { this.setState({slug, curie}) }.bind(this) );
  }



  render() { 
    const { curie } = this.props.match.params;
    const { slug } = this.state;
    if ( curie == this.state.curie ) {
      return( <Redirect to={`/t/${slug}`} /> ) 
    } else { return null } 
   }

}
