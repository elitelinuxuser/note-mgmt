import React from "react";
import { Row } from "react-bootstrap";
import { Card, Icon } from "antd";
import { connect } from "react-redux";
import { getNotes } from "../actions/notes";
import Note from "./Note";

class Notes extends React.Component {
  async componentDidMount() {
    const { getNotes } = this.props;
    await getNotes();
    // const url = "http://localhost:5000";
    // const res = await axios.get(`${url}/api/list`);
    // console.log(res.data);
  }

  async componentDidUpdate() {
    const { getNotes } = this.props;
    await getNotes();
  }

  render() {
    const { notes } = this.props;
    return (
      <Row>
        {notes.map(({ title, desc, id }) => (
          <Note key={id} title={title} desc={desc} id={id} />
        ))}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.note.notes
});

export default connect(
  mapStateToProps,
  { getNotes }
)(Notes);
