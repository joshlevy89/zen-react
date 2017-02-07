import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Dropdown from './Dropdown';
import Time_Series_Plot from './Time_Series_Plot'
import TestMap from './TestMap'
import { Button, Panel } from 'react-bootstrap';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      var BASE_URL = 'http://localhost:5000/'
    }
else {
  var BASE_URL = 'https://zenysis-flask.herokuapp.com/'
}

class App extends Component {

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      axios.get(BASE_URL + 'zenysis-flask/api/v1.0/wake_up')
      // .then((response) => {
      //   console.log("WOKE UP")
      // })
      // .catch((error) => {
      //   console.log("STILL SLEEPING")
      //   alert(error)
      // });
    }
  }

  state = {
    malaria_cases_showing: null,
    malaria_perc_showing: null,
    time_series_showing: [],
    malaria_perc_change_showing: null,
    disag_dict: {
      'gender': ['all'],
      'year': ['2017'],
      'age': ['all'],
      'month': ['all']
    }
  }

  set_region = (arg) => {
    this.setState({
      ...this.state,
      disag_dict: {
        ...this.state.disag_dict,
        'region': [arg]
      }
    });
  }

  get_malaria_projection=() => {
    var disag_dict = this.clean_disag_dict(this.state.disag_dict)
    axios.post(BASE_URL + 'zenysis-flask/api/v1.0/stats', disag_dict)
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

    axios.post(BASE_URL + 'zenysis-flask/api/v1.0/time_series', disag_dict)
    .then((response) => {
      var time_series = response.data.time_series.time_series
      var perc_change = response.data.time_series.perc_change
      this.setState({time_series_showing: time_series})
      this.setState({malaria_perc_change_showing: perc_change})
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
        <a className="Slides-link"
          target="_blank"
          href="https://docs.google.com/presentation/d/1wQ_vliMepL890e72Ifq9oXc9GA6x8ale8tIGYLqwqbk/edit#slide=id.g35f391192_00">
          check out slides
        </a>
        <h2 className="Title">Know More Malaria</h2>
        <div className="App-header">
          <div className="Selection-block">
            <div className="Test-map">
              {this.state.disag_dict.region ?
                <div className="Region-select-text">
                  {"Selected region: " + this.state.disag_dict.region[0]}
                </div>:
                <div className="Region-select-text">
                  {"Selected region: country"}
                </div>
              }
              <TestMap set_region={this.set_region} />
            </div>
            <div className="Dropdown-list">
              <div className="Dropdown-select-text">Select by:</div>
              <Dropdown
              update_dropdown_state={this.update_dropdown_state}
              state = {this.state} type = {"year"}
              options = {['2017', '2016', '2015', '2014']}/>
              <Dropdown
              update_dropdown_state={this.update_dropdown_state}
              state = {this.state} type = {"month"}
              options = {this.get_month_list()}/>
              <Dropdown
              update_dropdown_state={this.update_dropdown_state}
              state = {this.state} type = {"age"}
              options = {['all', '<5', '5-14', '>=15']}/>
              <Dropdown
              update_dropdown_state={this.update_dropdown_state}
              state = {this.state} type = {"gender"}
              options = {['all', 'male', 'female']}/>
              <Button className="Calculate-button"
              onClick={() => this.get_malaria_projection()}
              bsStyle="success"
              bsSize="large">Calculate</Button>
            </div>
            <div className="Time-series-plot">
              {this.state.malaria_cases_showing ?
                (<div>
                  <div className="Malaria-cases-text">
                    {"Malaria cases: " + this.state.malaria_cases_showing +
                    " (" + this.state.malaria_perc_showing + "%)"}
                  </div>
                  <div>
                    <Time_Series_Plot data = {this.state.time_series_showing}/>
                  </div>
                  <div className="Recommendation-text">
                    {this.state.malaria_perc_change_showing > 0 ?
                      <Panel header="Malaria cases rising" bsStyle="danger">
                        {"The malaria incidence at this time will be " +
                        this.state.malaria_perc_change_showing + "% higher than usual."}
                        <br/>
                        {"Consider allocating resources to this population."}
                      </Panel>:
                       <Panel header="Malaria cases falling" bsStyle="info">
                        {"The malaria incidence at this time will be " +
                        Math.abs(this.state.malaria_perc_change_showing) + "% lower than usual."}
                        <br/>
                        {"This target population is relatively safe."}
                      </Panel>
                    }
                  </div>
                </div>)
                :
                (<p className="Instructions">
                  For a malaria forecast, fill in the information on the left
                  <br/>and click calculate.
                </p>)
              }
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
