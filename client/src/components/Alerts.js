import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "antd";

class Alerts extends Component {
  render() {
    const { alerts } = this.props;
    const { msg, alertType, id } = alerts;
    if (alerts.length > 0)
      return alerts.map(alert => (
        <Alert
          style={{
            width: "40%",
            margin: "1em",
            position: "absolute",
            left: "30%",
            zIndex: 10000
          }}
          key={alert.id}
          message={alert.msg}
          type={alert.alertType}
          showIcon
        />
      ));
    else {
      return <></>;
    }
  }
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
