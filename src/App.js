import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Hero from "./sections/Hero";
import UploadPanel from "./components/UploadPanel";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import PhotographyLanding from "./pages/PhotographyLanding";
import { AppDataProvider } from './context/AppDataContext';

function App() {
  return (
    <AppDataProvider>
      <Router>
        <Switch>
          <Route path="/upload" component={UploadPanel} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Hero} />
          <Route exact path="/home" component={Home} />
          <Route path="/photography" component={PhotographyLanding} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </Router>
    </AppDataProvider>
  );
}

export default App;
