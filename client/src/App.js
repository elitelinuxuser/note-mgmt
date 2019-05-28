import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

import AddNote from "./components/AddNote";
import ListNotes from "./components/ListNotes";
import Homepage from "./components/Homepage";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import Alerts from "./components/Alerts";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import Search from "./components/Search";
import PrivateRoute from "./components/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Alerts />
      <Router>
        <Switch>
          <PrivateRoute path="/notes" component={Notes} />
          <PrivateRoute exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/add" component={AddNote} />
          <PrivateRoute path="/list" component={ListNotes} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/search" component={Search} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
