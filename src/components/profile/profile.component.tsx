import React, { Component } from "react";
import { AuthService } from "../../services/auth.service";

import Grid from "@material-ui/core/Grid";
import { withStyles, Theme } from "@material-ui/core/styles";

import ProfilePhoto from "../profilephoto/profilephoto.component";
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent';


interface IState {
  apps: any;
}

const styles = (theme: Theme) => ({
  wrapper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  profile: {
    // border: "1px solid",
    // borderColor: theme.palette.primary.light
    //borderColor: 'red'
  }
});

interface IHomeProps {
  theme: Theme;
  classes: any;
}

class Profile extends Component<IHomeProps, IState> {
  authService: AuthService;

  constructor(props: IHomeProps) {
    super(props);
    this.authService = new AuthService();
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    
    return (
      <Grid container spacing={24} className={classes.wrapper}>
        <Grid item xs={6} className={classes.profile}>
          <Card>
            <CardHeader avatar={<ProfilePhoto type="profile" />} title={this.authService.getUser().name} subheader={this.authService.getUser().name}>
            </CardHeader>
            <CardContent>
              This is a test
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
