import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//import grey from "@material-ui/core/colors/grey";

const DiscoveryTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1172DD"
    }
  },
  typography: {
    fontFamily: ["Open Sans", 'sans-serif'],
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#fff",
        color: "rgba(0,0,0,0.6)"
      }
    }
  }
});

export default DiscoveryTheme;
