import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Loading extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CircularProgress />
          <p>Please wait...</p>
        </header>
      </div>
    );
  }
}
