import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import UploadPanel from "./components/UploadPanel";
import Login from "./pages/Login";
import PhotographyLanding from "./pages/PhotographyLanding";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/upload" component={UploadPanel} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/photography" component={PhotographyLanding} />
      </Switch>
    </Router>
  );
}

export default App;
