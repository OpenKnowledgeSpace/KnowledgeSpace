import React, { Component } from 'react';
import { Container } from "semantic-ui-react";

import Nav from './Nav';
import Main from './Main';
import './App.css';

class App extends Component {
  render() {
		return (
      <div className="App">
        <Nav />
     		<Main /> 
			</div>
    );
  }
}


export default App;
