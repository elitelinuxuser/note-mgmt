import React, { Component, Fragment } from "react";
import { Form, FormControl, Button, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import axios from "axios";
import Note from "./Note";

class Search extends Component {
  state = {
    searchTitle: "",
    notes: []
  };

  handleSearch = async () => {
    const url = "http://localhost:5000";
    let notes = await axios.get(`${url}/api/search/${this.state.searchTitle}`);
    this.setState({
      notes: notes.data
    });
  };

  handleChange = async e => {
    this.setState({
      searchTitle: e.target.value
    });
  };

  render() {
    const { searchTitle, notes } = this.state;
    return (
      <Fragment>
        <Navbar />
        <Form
          inline
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: "3em"
          }}
        >
          <FormControl
            style={{ width: "50%" }}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTitle}
            onChange={this.handleChange}
          />
          <Button variant="outline-primary" onClick={this.handleSearch}>
            Search
          </Button>
        </Form>
        <Row>
          {notes.map(({ title, desc, id }) => (
            <Note key={id} title={title} desc={desc} id={id} />
          ))}
        </Row>
      </Fragment>
    );
  }
}

export default Search;
