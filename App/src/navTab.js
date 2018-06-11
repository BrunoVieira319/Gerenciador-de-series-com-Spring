import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavItem, NavLink, Badge } from 'reactstrap';

class NavTab extends Component {
  render = () => (
    <NavItem 
      onClick={this.props.trocaCorTab} 
      style={{backgroundColor: this.props.tabCor}}
    >
      <NavLink onClick={() => this.props.toggleTab(this.props.tabID)}>
        { this.props.tabTitulo }{" "}
        <Badge color={this.props.color} pill> { this.props.contador } </Badge>
      </NavLink>
    </NavItem>
  )
}

export default NavTab;

