import React, { Component } from "react";
import Typical from "react-typical";
import ModelViewer from '@metamask/logo';
import model from '../fox.json';

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  componentDidMount() {

    // for some reason, I couldn't put this outside componentDidMount
    const viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 200,
      height: 200,
  
      // To make the face follow the mouse.
      followMouse: true,
  
      // head should slowly drift (overrides lookAt)
      slowDrift: false,
      meshJson: model
    });

    // add model to DOM
    const container = document.getElementById('model');
    container.appendChild(viewer.container);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight, display: 'block' }}>
        <div className="row aligner" style={{height: '100%'}}>
          <div className="col-md-12">
            <div>
              <div id="model"></div>
              <br/>
              <h1 className="mb-0">
                <p>{[name]}</p>
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <div className="social-links header-social-links">{networks}</div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
