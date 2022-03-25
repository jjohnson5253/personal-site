import React, { Component } from "react";
import Tilt from 'react-parallax-tilt';

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    if (this.props.resumeGames && this.props.resumeBasicInfo) {
      var sectionName = "🕹️ Games";
      var projects = this.props.resumeGames.map(function (projects) {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects.title}
            style={{ cursor: "pointer" }}
          >
            <Tilt
              tiltReverse = "true"
              tiltMaxAngleX = "10"
              tiltMaxAngleY = "10"
            >
              <a
              href={projects.url}
              >
                <span className="portfolio-item d-block">
                  <div className="foto">
                    <div>
                      <img
                        src={projects.images[0]}
                        alt="projectImages"
                        height="230"
                        style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                      />
                      <span className="project-date">{projects.startDate}</span>
                      <br />
                      <p className="project-title-settings mt-3">
                        {projects.title}
                      </p>
                      <p className="project-desc-settings mt-3">
                        {projects.description}
                      </p>
                    </div>
                  </div>
                </span>
              </a>
            </Tilt>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Games;
