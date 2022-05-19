import './App.css';
import React from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = ()=> {  
  const appName="NewsHook"
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API
 
    return (
      <div>
        <BrowserRouter>        
          <NavBar />
          <Routes>            
            <Route exact path="/home"  element={<News key="home" country="in" pageSize={pageSize} apiKey={apiKey} category="general" appName={appName} />} />
            <Route exact path="/business"  element={<News key="business" country="in" pageSize={pageSize} apiKey={apiKey} category="business" appName={appName} />} />
            <Route exact path="/entertainment"  element={<News key="entertainment" country="in" pageSize={pageSize} apiKey={apiKey} category="entertainment" appName={appName} />} />
            <Route exact path="/general"  element={<News key="general" country="in" pageSize={pageSize} apiKey={apiKey} category="general" appName={appName} />} />
            <Route exact path="/health" element={<News  key="health" country="in" pageSize={pageSize} apiKey={apiKey} category="health" appName={appName} />} />
            <Route exact path="/science"  element={<News key="science" country="in" pageSize={pageSize} apiKey={apiKey} category="science" appName={appName} />} />
            <Route exact path="/sports"  element={<News key="sports" country="in" pageSize={pageSize} apiKey={apiKey} category="sports" appName={appName} />} />
            <Route exact path="/technology"  element={<News key="technology" country="in" pageSize={pageSize} apiKey={apiKey} category="technology" appName={appName} />} />
          </Routes>
        </BrowserRouter>
      </div>
    )  
}

export default App