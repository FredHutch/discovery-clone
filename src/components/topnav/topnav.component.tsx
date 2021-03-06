import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import ProfilePhoto from "../profilephoto/profilephoto.component";
import { AuthService } from "../../services/auth.service";
import DiscoveryTheme from "../../styles/discovery.theme";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

//import topNavStyles from './topnav.styles';

const styles = (theme: Theme) => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20
  // },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative" as "relative",
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute" as "absolute",
    pointerEvents: "none" as "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    minWidth: "50%"
  }
});

interface TopNavProps {
  theme: Theme;
  classes: any;
}

class TopNav extends Component<TopNavProps> {
  authService: AuthService;

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    photoUrl: ""
  };

  handleProfileMenuOpen = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event: any) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  constructor(props: TopNavProps) {
    super(props);

    this.authService = new AuthService();
  }

  componentDidMount() {
    // this.authService.getGraphTokenSilent().then(graph_access_token => {
    //   sessionStorage.setItem("graph_access_token", graph_access_token);
    //   // this.authService.getPhoto("48x48", (url: string) => {
    //   //   this.setState({ photoUrl: url });
    //   // });
    // });
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>
          {/* <Link to={"/profile"}>Profile</Link> */}
          {/* Profile */}
          Test
        </MenuItem>
        {/* <MenuItem onClick={this.handleMenuClose}>My account</MenuItem> */}
        <MenuItem onClick={this.handleMenuClose}>
          Profile
          {/* <Link to={"/profile"}>Profile</Link> */}
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Discovery
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon} />
              <TextField
                id="filled-adornment-password"
                className={classNames(classes.margin, classes.textField)}
                variant="filled"
                type="text"
                label="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              {/* <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              >
                <SearchIcon />
              </InputBase> */}
            </div>
            {/* <div className={classes.grow} /> */}
            <div className={classes.sectionDesktop}>
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <Button
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <ProfilePhoto />
                <Typography
                  className={classes.title}
                  variant="button"
                  color="inherit"
                  noWrap
                >
                  {this.authService.getUser().name}
                </Typography>
                <ArrowDropDown />
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopNav);
