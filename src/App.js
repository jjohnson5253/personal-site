import React, { Component } from "react";
import "./App.scss";
import Home from "./components/Home";
import TestPage from "./components/TestPage";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

class App extends Component {

  render() {
    return (
      /*Set up routes for multiple pages*/
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TestPage" element={<TestPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
