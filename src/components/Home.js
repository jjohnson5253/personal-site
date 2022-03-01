//
// This file contains the wrapper for the home page and all of it's components
//

import React, { Component } from "react";
import $ from "jquery";
import "../App.scss";
import Header from "./Header";
import Footer from "./Footer";
import Projects from "./Projects";
import Skills from "./Skills";
import OpenSource from "./OpenSource";
// uncomment this to use links for multipage
//import { NavLink } from "react-router-dom";

// TODO: remove the language code. Right now it's just disabled
class Home extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  componentDidMount() {
    this.loadSharedData();
    this.loadResume();
  }

  loadResume(path) {
    $.ajax({
      url: `resume.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  render() {
    return (
      <div>
        {/* Remove this comment to see how you can have multiple pages
        <NavLink to="/TestPage">TestPage</NavLink>
        */}
        <Header sharedData={this.state.sharedData.basic_info}
                sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <OpenSource
          sharedOpenSource={this.state.sharedData.openSource}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default Home;
