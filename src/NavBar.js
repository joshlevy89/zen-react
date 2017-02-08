import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { browserHistory } from 'react-router'

export default class NavBar extends Component{
  render() {
    return (
    <div>
    <Navbar>
      <Navbar.Header>
          <Navbar.Brand>
            <a>Know More Malaria</a>
          </Navbar.Brand>
      </Navbar.Header>
      <Nav>
          <NavItem onClick = {()=>browserHistory.push('/home')} >home</NavItem>
          <NavItem onClick = {()=>browserHistory.push('/slides')} >slides</NavItem>
      </Nav>
    </Navbar>
    {this.props.children}
    </div>
    );
  }
};