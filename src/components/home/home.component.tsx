import React, { Component } from "react";

import { withStyles, Theme } from "@material-ui/core/styles";

interface IState {
  apps: any;
}

const styles = (theme: Theme) => ({
  home: {
    padding: theme.spacing.unit * 2,
    //contentAlign: 'center' as 'center'
    //textAlign: "center" as "center"
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  }
  // ,
  // inner:{
  //   display: 'inline-block'
  // }
});

interface IHomeProps {
  theme: Theme;
  classes: any;
}

class Home extends Component<IHomeProps, IState> {
  constructor(props: IHomeProps) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props;

    return (
        <div></div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
