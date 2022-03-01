//
// Page/component for testing purposes
//

import React, { Component } from "react";

class Pong extends Component {

  /*componentDidMount() {
    const script = document.createElement("script");
    script.src = "js/phaser.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.src = "js/myGame.js";
    script.async = true;
    document.body.appendChild(script);   
  }*/

  render() {
    return (
      <div>
        <script type = "text/javascript" src = "js/phaser.min.js"></script>

        <script type = "text/javascript" src = "js/myGame.js"></script>
      </div>
    );
  }
}

export default Pong;
