import React, { Component, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { AuthenticationState, AuthService } from "../../services/auth.service";

import Home from "../home/home.component";
import TopNav from "../topnav/topnav.component";
import Loading from "../loading/loading.component";
import Profile from "../profile/profile.component";

interface IAuthState {
  authState: AuthenticationState;
}

export default class Authenticate extends Component<{}, IAuthState> {
  authService: AuthService;

  constructor(props: any) {
    super(props);
    this.authService = new AuthService();
  }

  componentDidMount() {
    let authState = sessionStorage.getItem("authState");

    if (
      authState == AuthenticationState[AuthenticationState.Authenticating] &&
      this.authService.getUser()
    ) {
      this.authService.getTokenSilent("access_token").then(accessToken => {
        //Renew access token after expiry
        sessionStorage.setItem("access_token", accessToken);
        this.setState({
          authState: AuthenticationState.Authenticated
        });
      });
    } else if (
      authState != AuthenticationState[AuthenticationState.Authenticating]
    ) {
      this.setState({
        authState: AuthenticationState.Authenticating
      });

      sessionStorage.setItem(
        "authState",
        AuthenticationState[AuthenticationState.Authenticating]
      );

      this.authService.login();
    }
  }

  render() {
    const accessToken = sessionStorage.getItem("access_token");

    if (this.state && this.state.authState == AuthenticationState.Authenticated)
      return (
        <React.Fragment>
          <Router>
            <React.Fragment>
              <TopNav />
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
            </React.Fragment>
          </Router>
        </React.Fragment>
      );
    else return <Loading />;
  }
}
