import React, { Component } from "react";

import { withStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import DataService from "../../services/data.service";

const drawerWidth = 240;

const styles = (theme: Theme) => ({
  //   root: {
  //     display: 'flex',
  //   },
  //   appBar: {
  //     zIndex: theme.zIndex.drawer + 1,
  //   },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 5
  },
  drawerPaper: {
    width: drawerWidth,
    top: "auto",
    zIndex: theme.zIndex.appBar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

interface IState {
  facets: any;
}

//function Facets(props: any) {
class Facets extends Component<any, IState> {
  dataService: DataService;

  constructor(props: any) {
    super(props);

    this.dataService = new DataService();
    this.state = {
      facets: {}
    };
  }

  componentDidMount() {
    this.getFacets();
  }

  getFacets() {
    this.dataService.getFacets((f: any) => {
      this.setState({ facets: f });
    });
  }

  prepareFacets(key: string){
    if(this.state.facets && key in this.state.facets){
      var result = this.state.facets[key]["data_source.keyword"].buckets.map((item: any) => {
        return (
          <ListItem button key={item.key}>
          {/* <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon> */}
          <ListItemText primary={item.key + item.doc_count} />
        </ListItem>
          );
      });

      return result;
    }

    return <div></div>;
  }

  render() {
    const { classes } = this.props;

    const sourceFacets = this.prepareFacets('source');

    return (
      // <div className={classes.root}>
      //   <AppBar position="fixed" className={classes.appBar}>
      //     <Toolbar>
      //       <Typography variant="h6" color="inherit" noWrap>
      //         Clipped drawer
      //       </Typography>
      //     </Toolbar>
      //   </AppBar>
      <React.Fragment>
        {/* <div className={classes.toolbar} /> */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            {sourceFacets}
            {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

// ClippedDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Facets);
