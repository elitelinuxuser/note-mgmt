import React, {Component, Fragment} from 'react';
import {Container, Form, Button, Alert, Jumbotron, Nav, Navbar} from 'react-bootstrap';
import axios from 'axios';

class AddNote extends Component{
    state = {
        title: "",
        desc: '',
        hashKey: '',
        msg: '',
        show: false
    }
    handleTitleChange = e =>{
        this.setState({
            title: e.target.value
        })
    }
    handleDescChange = e => {
        this.setState({
            desc: e.target.value
        })
    }
    handleKeyChange = e =>{
        this.setState({
            hashKey: e.target.value
        })
    }
    handleSubmit = async e => {
        console.log("Submit")
        e.preventDefault();
        const url = "http://localhost:5000"; 
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          }
        const res = await axios.post(`${url}/api/add`, this.state ,config);
          this.setState({
            title: "",
            desc: '',
            hashKey: '',
            msg: res.data.msg,
            show: true
          })
    }
    render(){
        const handleHide = () => this.setState({ show: false });
        const {title, desc ,hashKey} = this.state;
        return(<Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Notes App</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/add">Add Note</Nav.Link>
                <Nav.Link href="/list">List Notes</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control placeholder="Eg. Maria's phone number" onChange={this.handleTitleChange} value={title} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Eg. Maria's no. is 9066612448" onChange={this.handleDescChange} value={desc} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter passphrase</Form.Label>
                        <Form.Control placeholder="Enter the key" onChange={this.handleKeyChange} value={hashKey} />
                    </Form.Group>
                    <Button type="submit">Add Note</Button>
                </Form>
                {this.state.msg != '' && <Container><Alert dismissible show={this.state.show} onClose={handleHide} variant="danger">
  <Alert.Heading >{this.state.msg}</Alert.Heading>
</Alert></Container>}
            </Jumbotron></Fragment>
        )
    }
}

export default AddNote;