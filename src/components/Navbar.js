import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar__address">
          내 블록체인 계정 주소 : {this.props.account}
        </div>
        {this.props.account ? (
          <img
            className="icon"
            width="35"
            height="35"
            src={`data:image/png;base64,${new Identicon(
              this.props.account,
              30
            ).toString()}`}
          />
        ) : (
          <span></span>
        )}
      </nav>
    );
  }
}

export default Navbar;
