import React, { Component, Fragment } from "react";
import { Col } from "react-bootstrap";
import { Card, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import { deleteNote, updateNote } from "../actions/notes";
const { TextArea } = Input;

class Note extends Component {
  state = {
    edit: false,
    title: "",
    desc: ""
  };

  async componentDidMount() {
    const { title, desc } = this.props;
    this.setState({
      title,
      desc
    });
  }

  handleEdit = () => {
    this.setState({
      edit: true
    });
  };

  handleEditDone = async () => {
    this.setState({
      edit: false
    });
    const { title, desc } = this.state;
    const { id, updateNote } = this.props;
    await updateNote({ title, desc, id });
  };

  handleDelete = async () => {
    const { title, desc, deleteNote } = this.props;
    const deleteData = { title, desc };
    await deleteNote(deleteData);
  };

  handleCancel = () => {
    this.setState({
      edit: false,
      desc: this.props.desc
    });
  };

  handleChange = e => {
    this.setState({
      desc: e.target.value
    });
  };

  render() {
    const { title, desc, edit } = this.state;
    // const { edit } = this.state;
    return (
      <Col>
        <Card
          title={title}
          //   extra={<a href="#">More</a>}
          style={{ width: 300, borderColor: "black", margin: "20px" }}
          headStyle={{ borderColor: "black" }}
          actions={[
            <Icon type="delete" onClick={this.handleDelete} />,
            <Icon type="edit" onClick={this.handleEdit} />
          ]}
        >
          {edit ? (
            <Fragment>
              <TextArea
                placeholder="Write your note here!"
                autosize={{ minRows: 3 }}
                value={desc}
                onChange={this.handleChange}
              />
              <Button className="btn-grp" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button
                className="btn-grp"
                type="primary"
                onClick={this.handleEditDone}
              >
                Done
              </Button>
            </Fragment>
          ) : (
            <p>{desc}</p>
          )}
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { deleteNote, updateNote }
)(Note);
