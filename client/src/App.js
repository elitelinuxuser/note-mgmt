import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

import AddNote from "./components/AddNote";
import ListNotes from "./components/ListNotes";
import Homepage from "./components/Homepage";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import { Button } from "react-bootstrap";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/notes" component={Notes} />
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/add" component={AddNote} />
        <Route path="/list" component={ListNotes} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
