import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row } from "antd";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { Redirect } from "react-router-dom";

const FormItem = Form.Item;

class NormalRegisterForm extends Component {
  handleSubmit = async e => {
    const { register } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        await register(values);
        // login(email, password);
        // await loadUser();
        console.log(this.props.auth);
      }
    });
  };

  render() {
    // console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <Row className="row-form" type="flex" align="middle">
          <div align="center" className="container-fluid">
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input your full name!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Name"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>
              <FormItem>
                {/* {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)} */}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
              </FormItem>
            </Form>
          </div>
        </Row>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default connect(
  mapStateToProps,
  { register }
)(WrappedNormalRegisterForm);
