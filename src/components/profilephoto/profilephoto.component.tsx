import React, { Component } from "react";
import { AuthService } from "../../services/auth.service";

import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  avatar: {
    margin: 10
  },
  profile: {
    height: 90,
    width: 90
  }
});

interface IState {
  photoUrl: string;
}

class ProfilePhoto extends Component<any, IState> {
  authService: AuthService;
  graph_token: string | null;

  constructor(props: any) {
    super(props);

    this.state = { photoUrl: "" };
    this.authService = new AuthService();
    this.graph_token = sessionStorage.getItem("graph_access_token");
  }

  componentDidMount() {
    if (this.graph_token && this.graph_token != "") {
      this.authService.getPhoto("48X48", (url: string) => {
        this.setState({ photoUrl: url });
      });
    } else {
      this.authService.getGraphTokenSilent().then(graph_access_token => {
        sessionStorage.setItem("graph_access_token", graph_access_token);
        this.authService.getPhoto("48X48", (url: string) => {
          this.setState({ photoUrl: url });
        });
      });
    }
  }

  render() {
    let image: any;
    const { classes, type } = this.props;

    if (this.state.photoUrl != "") {
      image = (
        <Avatar
          className={type == "profile" ? classes.profile : classes.avatar}
          src={this.state.photoUrl}
        />
      );
    } else {
      image = <div />;
    }

    return <div>{image}</div>;
  }
}

export default withStyles(styles)(ProfilePhoto);
