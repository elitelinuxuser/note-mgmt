import React from "react";
import { Container } from "react-bootstrap";
import { Card, Icon } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

class Notes extends React.Component {
  state = {
    data: []
  };
  async componentDidMount() {
    const url = "http://localhost:5000";
    const res = await axios.get(`${url}/api/list`);
    console.log(res.data);
    this.setState({
      data: res.data
    });
  }
  render() {
    const { data } = this.state;
    return (
      <Container>
        {data.map(({ title, desc }, key) => (
          <Container style={{ margin: "20px" }}>
            <Card
              title={title}
              key={key}
              //   extra={<a href="#">More</a>}
              style={{ width: 300, borderColor: "black" }}
              headStyle={{ borderColor: "black" }}
              actions={[<Icon type="delete" />, <Icon type="edit" />]}
            >
              <p>{desc}</p>
            </Card>
          </Container>
        ))}
      </Container>
    );
  }
}

export default Notes;
