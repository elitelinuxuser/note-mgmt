import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import { Jumbotron } from "react-bootstrap";
import Notes from "./Notes";

class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Jumbotron>
          Welcome to Note Making Application! To get started, click on Add Note
          in the navbar.
        </Jumbotron>
        <Notes />
      </Fragment>
    );
  }
}

export default Homepage;
