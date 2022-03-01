import React, { Component } from "react";

class OpenSource extends Component {
  render() {
    if (this.props.sharedOpenSource && this.props.resumeBasicInfo) {
      var sectionName = "Open Source Contributions ❤️";
      var openSource = this.props.sharedOpenSource.projects.map(function (openSource, i) {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <a href={openSource.url} target="_blank" rel="noopener noreferrer" 
                style={{ textDecoration: "none" }}>
              <div className="text-center openSource-tile"
                style={{ color: "#fff" }}
              >
                <p className={openSource.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "50%", marginTop: "4px" }}
                  >
                    {openSource.name}
                  </p>
                  <p
                    className="text-center"
                    style={{ fontSize: "30%", marginTop: "4px", fontStyle: "italic" }}
                  >
                    {openSource.desc}
                  </p>
                </p>
              </div>
              </a>
            </span>
          </li>
        );
      });
    }

    return (
      <section id="openSource">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="section-title">
              <span className="text-white">{sectionName}</span>
            </h1>
          </div>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto skill-icon">{openSource}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default OpenSource;
