import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter,Routes,Route} from "react-router-dom";

export default class App extends Component {  
  appName="NewsHook"
  pageSize=3;
  apiKey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <BrowserRouter>        
          <Navbar />
          <Routes>            
            <Route exact path="/home"  element={<News key="home" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="general" appName={this.appName} />} />
            <Route exact path="/business"  element={<News key="business" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="business" appName={this.appName} />} />
            <Route exact path="/entertainment"  element={<News key="entertainment" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="entertainment" appName={this.appName} />} />
            <Route exact path="/general"  element={<News key="general" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="general" appName={this.appName} />} />
            <Route exact path="/health" element={<News  key="health" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="health" appName={this.appName} />} />
            <Route exact path="/science"  element={<News key="science" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="science" appName={this.appName} />} />
            <Route exact path="/sports"  element={<News key="sports" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="sports" appName={this.appName} />} />
            <Route exact path="/technology"  element={<News key="technology" country="in" pageSize={this.pageSize} apiKey={this.apiKey} category="technology" appName={this.appName} />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}