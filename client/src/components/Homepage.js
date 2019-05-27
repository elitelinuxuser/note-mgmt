import React, { Component, Fragment } from "react";
import { Nav, Navbar, Jumbotron } from "react-bootstrap";
import Notes from "./Notes";

class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Notes App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Note</Nav.Link>
            <Nav.Link href="/list">List Notes</Nav.Link>
          </Nav>
        </Navbar>
        {/* <Jumbotron>
                Welcome to Note Making Application! To get started, click on Add Note in the navbar.
            </Jumbotron> */}
        <Notes />
      </Fragment>
    );
  }
}

export default Homepage;
