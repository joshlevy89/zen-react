import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Dropdown from './Dropdown';

class App extends Component {

  state = {
    malaria_cases_showing: 0,
    disag_dict: {}
  }

  get_malaria_projection=() => {
    var disag_dict = this.clean_disag_dict(this.state.disag_dict)
    axios.post('http://localhost:5000/zenysis-flask/api/v1.0/tasks', disag_dict)
    .then((response) => {
      var malaria_cases = response.data.tot
      this.setState({malaria_cases_showing: malaria_cases})
    })
    .catch((error) => {
      alert(error)
    });
  }

  clean_disag_dict(disag_dict) {
    for (var key in disag_dict) {
      var arr = disag_dict[key]
      var index = arr.indexOf('all')
      if (index > -1) { arr.splice(index, 1); }
      if (arr.length === 0) delete disag_dict[key]
    }
    return disag_dict
  }

  update_dropdown_state = (e, name) => {
    // This updates the disag_dict in state specifically
    this.setState({
      ...this.state,
      disag_dict: {
        ...this.state.disag_dict,
        [name]: [e.target.value]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Forecasting Malaria in Ethiopia</h2>
          <div>{"Malaria cases showing: " + this.state.malaria_cases_showing}</div>
          <Dropdown
          update_dropdown_state={this.update_dropdown_state}
          state = {this.state} type = {"gender"}
          options = {['all', 'male', 'female']}/>
          <Dropdown
          update_dropdown_state={this.update_dropdown_state}
          state = {this.state} type = {"year"}
          options = {['all', '2014', '2015', '2016']}/>
          <Dropdown
          update_dropdown_state={this.update_dropdown_state}
          state = {this.state} type = {"age"}
          options = {['all', '<5', '5-14', '>=15']}/>
          <button onClick={() => this.get_malaria_projection()}>Calculate</button>
        </div>
      </div>
    );
  }
}

export default App;
