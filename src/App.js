import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Hero from "./sections/Hero";
import UploadPanel from "./components/UploadPanel";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import PhotographyLanding from "./pages/PhotographyLanding";
import AlbumGrid from "./components/AlbumGrid";
import AlbumView from "./components/AlbumView";
import { AppDataProvider } from './context/AppDataContext';
import About from "./pages/About";
import Contact from "./pages/Contact";

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
          <Route path="/wedding" component={() => <AlbumGrid category="Wedding" />} />
          <Route path="/fashion" component={() => <AlbumGrid category="Fashion" />} />
          <Route path="/album/:id" component={AlbumView} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Router>
    </AppDataProvider>
  );
}

export default App;
