import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Dropdown from './Dropdown';
import Time_Series_Plot from './Time_Series_Plot'
import TestMap from './TestMap'

class App extends Component {

  state = {
    malaria_cases_showing: 0,
    malaria_perc_showing: 0,
    time_series_showing: [],
    disag_dict: {
      'gender': ['all'],
      'year': ['2017'],
      'age': ['all'],
      'month': ['all']
    }
  }

  logToCons = (arg) => {
    console.log(arg);
  }

  get_malaria_projection=() => {
    var disag_dict = this.clean_disag_dict(this.state.disag_dict)
    //console.log(disag_dict)
    axios.post('https://zenysis-flask.herokuapp.com/zenysis-flask/api/v1.0/stats', disag_dict)
    .then((response) => {
      var cases = response.data.stats.cases
      var pop = response.data.stats.pop
      var perc = (cases/pop) * 100
      var perc_rounded = Math.round(perc * 100)/100
      this.setState({malaria_cases_showing: cases})
      this.setState({malaria_perc_showing: perc_rounded})
    })
    .catch((error) => {
      alert(error)
    });

    axios.post('https://zenysis-flask.herokuapp.com/zenysis-flask/api/v1.0/time_series', disag_dict)
    .then((response) => {
      var time_series = response.data.time_series.time_series
      this.setState({time_series_showing: time_series})
      console.log(time_series)
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

  get_month_list = () => {
    var month_list = []
    month_list[0] = 'all'
    for (var i=1; i<13; i++) {
      month_list[i] = parseInt(i)
    }
    return month_list
  }

  render() {
    return (
      <div className="App">
        <h2>Know More Malaria</h2>
        <div className="App-header">
          <TestMap sendRegionName={this.logToCons} />
          <div className="Dropdown-list">
            <div>{"Malaria cases: " + this.state.malaria_cases_showing +
            " (" + this.state.malaria_perc_showing + "%)"}</div>
            <Dropdown
            update_dropdown_state={this.update_dropdown_state}
            state = {this.state} type = {"gender"}
            options = {['all', 'male', 'female']}/>
            <Dropdown
            update_dropdown_state={this.update_dropdown_state}
            state = {this.state} type = {"year"}
            options = {['2017', '2016', '2015', '2014']}/>
            <Dropdown
            update_dropdown_state={this.update_dropdown_state}
            state = {this.state} type = {"age"}
            options = {['all', '<5', '5-14', '>=15']}/>
            <Dropdown
            update_dropdown_state={this.update_dropdown_state}
            state = {this.state} type = {"month"}
            options = {this.get_month_list()}/>
            <button onClick={() => this.get_malaria_projection()}>Calculate</button>
          </div>
          <div className="Time-series-plot">
            <Time_Series_Plot data = {this.state.time_series_showing}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
