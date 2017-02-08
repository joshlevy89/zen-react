import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from '../Home'
import Slides from '../Slides'
//import BooksScreen from '../BooksScreen'
import NavBar from '../NavBar'

module.exports = (
<Route path ="/" component={NavBar}>
  <IndexRoute component={Home} />
    <Route path="/home" component={Home}/>
    <Route path="/slides" component={Slides}/>
</Route>
)