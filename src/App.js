import React, { Component } from "react";
import "./App.scss";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

// TODO: remove the language code. Right now it's just disabled
class App extends Component {

  render() {
    return (
        <Home/>
    );
  }
}

export default App;
