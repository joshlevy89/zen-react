import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, { Component } from 'react';

export default class SimpleLineChart extends Component {
  render () {
    return (
      <LineChart width={700} height={300} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="date" label="dateas"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    );
  }
}
