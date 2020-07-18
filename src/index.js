import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./pages/user";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={User} />
      {/* <Route exact path="/rooms" component={} />
      <Route exact path="/rooms/:id" component={} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
