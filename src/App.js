import React, { Component } from "react";
import "./App.scss";
import Home from "./components/Home";
import TestPage from "./components/TestPage";
import Pong from "./components/TestPage";
import ProtectLand from "./components/ProtectLand";
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
          <Route path="/Pong" element={<Pong />} />
          <Route path="/ProtectLand" element={<ProtectLand />} />
          <Route exact path="/games/Protectland" render={() => {window.location.href="protect-your-land.html"}} />
        </Routes>
      </Router>
    );
  }
}

export default App;
