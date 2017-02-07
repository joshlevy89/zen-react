import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ErrorBar} from 'recharts'
import React, { Component } from 'react';
import './Time_Series_Plot.css';

export default class Time_Series_Plot extends Component {

  get_axis_lims = () => {
    var lower_bounds_list = this.props.data.map(function(entry) {return entry.cases - entry.bounds[0] })
    var upper_bounds_list = this.props.data.map(function(entry) {return entry.cases + entry.bounds[1] })
    var lowest = Math.min(...lower_bounds_list)
    var highest = Math.max(...upper_bounds_list)
    return [lowest, highest]
  }

  render () {
    var axis_lims = this.get_axis_lims(this.props.data)
    return (
      <LineChart className="Linechart" width={600} height={250} data={this.props.data}
            margin={{top: 20, right: 80, bottom: 20, left: 20}}>
       <XAxis dataKey="date" label="date"/>
       <YAxis dataKey="cases" label="cases" domain={axis_lims}
       margin={{top: 5, right: 30, left: 20, bottom: 5}}/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{r: 8}}>
        <ErrorBar dataKey="bounds" strokeWidth={1} stroke="blue" direction="y" />
       </Line>
      </LineChart>
    );
  }
}
