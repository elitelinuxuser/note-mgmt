import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Redirect } from "react-router-dom";

class NavbarUser extends Component {
  handleLogout = async () => {
    const { logout } = this.props;
    await logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Notes App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Note</Nav.Link>
            <Nav.Link href="/list">List titles</Nav.Link>
            <Nav.Link href="/search">Search Notes</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={this.handleLogout}>
            Logout
          </Button>
        </Navbar>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavbarUser);
