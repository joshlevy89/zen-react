import React, { Component } from 'react';

class Dropdown extends Component {
  render() {

  return (
    <div>
      <div className="Dropdown">
        <span className="Dropdown-text">{this.props.type}</span>
        <select className="Dropdown-menu"
        onChange={(e) => this.props.update_dropdown_state(e,this.props.type)}
        value={this.props.state.gender}>
        {this.props.options.map(function(option, i){
          return <option key={i} value={option}>{option}</option>
        })}
        </select>
      </div>
    </div>
    );
  }
}

export default Dropdown;