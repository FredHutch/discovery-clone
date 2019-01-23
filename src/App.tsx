import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";

import "./App.css";

import DiscoveryTheme from "./styles/discovery.theme";

import Auth from "./components/auth/auth.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={DiscoveryTheme}>
          <Auth />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
