import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row } from "antd";
import { connect } from "react-redux";
import { login, loadUser } from "../actions/auth";
import { Redirect } from "react-router-dom";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = { loading: false };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  handleSubmit = async e => {
    const { login, loadUser } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        this.enterLoading();
        await login(values.userName, values.password);
        // login(email, password);
        await loadUser();
        this.stopLoading();
        // console.log(this.props.auth);
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
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
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
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.state.loading}
                >
                  Log in
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

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect(
  mapStateToProps,
  { login, loadUser }
)(WrappedNormalLoginForm);
