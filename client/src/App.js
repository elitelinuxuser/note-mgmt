import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import AddNote from "./components/AddNote";
import ListNotes from "./components/ListNotes";
import Homepage from "./components/Homepage";
import Notes from "./components/Notes";
import { Button } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/notes" component={Notes} />
        <Route exact path="/" component={Homepage} />
        <Route path="/add" component={AddNote} />
        <Route path="/list" component={ListNotes} />
      </Switch>
    </Router>
  );
}

export default App;
