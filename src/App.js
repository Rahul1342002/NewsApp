
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default class App extends Component {
  pageSize =15;
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        
        <Routes>
          
          <Route exact path="/entertainment" element={<News pageSize={this.pageSize} country="us" category="entertainment" key={"entertainment"}/>}></Route>
          <Route exact path="/" element={<News pageSize={this.pageSize} country="us" category="general" key={"general"}/>}></Route>
          <Route exact path="/health" element={<News pageSize={this.pageSize} country="us" category="health" key={"health"}/>}></Route>
          <Route exact path="/science" element={<News pageSize={this.pageSize} country="us" category="science" key={"science"}/>}></Route>
          <Route exact path="/sports" element={<News pageSize={this.pageSize} country="us" category="sports" key={"sports"}/>}></Route>
          <Route exact path="/technology" element={<News pageSize={this.pageSize} country="us" category="technology" key={"technology"}/>}></Route>
        </Routes>
        </Router>
        </div>
    )
  }
}
