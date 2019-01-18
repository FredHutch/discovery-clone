import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";

import logo from "./logo.svg";
import "./App.css";

import DiscoveryTheme from "./styles/discovery.theme";
import { AuthenticationState, AuthService } from "./services/auth.service";

import Auth from "./components/auth/auth.component";


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <MuiThemeProvider theme={DiscoveryTheme}>
        <Auth />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
