import React, { Component, Fragment } from "react";
import { Form, Button, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import axios from "axios";
import Navbar from "./Navbar";

class AddNote extends Component {
  state = {
    title: "",
    desc: "",
    hashKey: "",
    msg: "",
    show: false
  };
  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleDescChange = e => {
    this.setState({
      desc: e.target.value
    });
  };
  handleKeyChange = e => {
    this.setState({
      hashKey: e.target.value
    });
  };
  handleSubmit = async e => {
    const { setAlert } = this.props;
    console.log("Submit");
    e.preventDefault();
    const url = "http://localhost:5000";
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`${url}/api/add`, this.state, config);
    this.setState({
      title: "",
      desc: "",
      hashKey: "",
      msg: res.data.msg
    });
    setAlert(res.data.msg, "success");
  };
  render() {
    const handleHide = () => this.setState({ show: false });
    const { title, desc } = this.state;
    return (
      <Fragment>
        <Navbar />
        <Jumbotron>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Title</Form.Label>
              <Form.Control
                placeholder="Eg. Maria's phone number"
                onChange={this.handleTitleChange}
                value={title}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Eg. Maria's no. is 9066612448"
                onChange={this.handleDescChange}
                value={desc}
              />
            </Form.Group>
            <Button type="submit">Add Note</Button>
          </Form>
          {/* {this.state.msg !== "" && (
            <Container>
              <Alert
                dismissible
                show={this.state.show}
                onClose={handleHide}
                variant="danger"
              >
                <Alert.Heading>{this.state.msg}</Alert.Heading>
              </Alert>
            </Container>
          )} */}
        </Jumbotron>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { setAlert }
)(AddNote);
