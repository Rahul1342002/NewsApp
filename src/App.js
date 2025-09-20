
import './App.css';

import React, { Component, useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = ()=> {
  const pageSize = 15;
  const apiKey=process.env.REACT_APP_NEWS_API;

 const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color="#1989f1ff"
        height={3}
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        
        <Routes>
          
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="entertainment" key={"entertainment"}/>}></Route>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="general" key={"general"}/>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="health" key={"health"}/>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="science" key={"science"}/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="sports" key={"sports"}/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="technology" key={"technology"}/>}></Route>
        </Routes>
        </Router>
        </div>
    )} 

export default App;
