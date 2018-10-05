import React, {Component} from "react";
import { Menu, Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
	  const fixed = false;	
    return (
      <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'> 
    

      <Container>
        <Header as='h1'>KnowledgeSpace</Header>
        <Menu.Item><Link to="/search">Search</Link></Menu.Item> 
      </Container>
    </Menu>
   );
  }
}


export default Nav;
