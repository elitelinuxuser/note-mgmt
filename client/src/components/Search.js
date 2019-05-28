import React, { Component, Fragment } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import Notes from "./Notes";

class Search extends Component {
  state = {
    title: ""
  };

  handleSearch = () => {};

  render() {
    return (
      <Fragment>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Fragment>
    );
  }
}

export default Search;
