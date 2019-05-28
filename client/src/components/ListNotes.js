import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getNotesByTitle } from "../actions/notes";
import { Container, ListGroup } from "react-bootstrap";

class ListNotes extends Component {
  async componentDidMount() {
    const { getNotesByTitle } = this.props;
    console.log(this.props);
    await getNotesByTitle();
  }

  render() {
    const { notes } = this.props;
    return (
      <Fragment>
        <Navbar />
        <Container style={{ margin: "3em" }}>
          <ListGroup>
            {notes.map((title, key) => (
              <ListGroup.Item
                style={{ marginTop: "4px", marginBottom: "4px" }}
                key={key}
                action
                // onClick={() => this.handleClick(title)}
              >
                {key + 1 + ". " + title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.note.notes
});

export default connect(
  mapStateToProps,
  { getNotesByTitle }
)(ListNotes);
