import React, { Component, Fragment } from "react";
import {
  Container,
  ListGroup,
  Modal,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import axios from "axios";

class ListNotes extends Component {
  state = {
    titles: [],
    hashKey: "",
    focusedTitle: "",
    view: false,
    title: "",
    desc: ""
  };

  async componentDidMount() {
    const url = "http://localhost:5000";
    const res = await axios.get(`${url}/api/list/titles`);
    this.setState({
      titles: res.data
    });
  }

  handleClick = title => {
    this.setState({
      focusedTitle: title
    });
    this.handleShow();
  };

  handleClose = () => {
    this.setState({ show: false, view: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleKeyChange = e => {
    this.setState({
      hashKey: e.target.value
    });
  };

  handleView = async e => {
    const { focusedTitle, hashKey } = this.state;
    const url = "http://localhost:5000";
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let data = { title: focusedTitle, hashKey };
    const res = await axios.post(`${url}/api/list/view`, data, config);
    this.setState({
      title: res.data.title,
      desc: res.data.desc,
      view: res.data.found
    });
  };

  render() {
    const { desc, titles, focusedTitle, view } = this.state;
    return (
      <Fragment>
        <Container style={{ margin: "3em" }}>
          <ListGroup>
            {titles.map((title, key) => (
              <ListGroup.Item
                key={key}
                action
                onClick={() => this.handleClick(title)}
              >
                {key + 1 + ". " + title}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{focusedTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {view ? (
                <p>{desc}</p>
              ) : (
                <>
                  <label htmlFor="basic-url">Enter the pass key</label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">Key</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="basic-url"
                      onChange={this.handleKeyChange}
                      value={this.state.hashKey}
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleView}>
                View
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Fragment>
    );
  }
}

export default ListNotes;
