import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
//import { Form } from "./Encounters/Form";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  MuiAppBarColorPrimary: {
    backgroundColor: `silver`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    position: `relative`,
    left: `70px`,
    bottom: `20px`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    fontFamily: `cursive`,
  },
});

const navLinks = [
  { title: `Report Encounter`, path: `/Form` },
  { title: `MY Encounters`, path: `/` },
  { title: `Encounters`, path: `/` },
  { title: `Notifications`, path: `/` },
];

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ backgroundColor: `#373a40` }}>
      <Toolbar className="toolBar">
        <List component="nav" aria-labelledby="main navigation">
          <Link to="/">
            <IconButton
              className="linkHomePage"
              edge="start"
              color="inherit"
              aria-label="home">
              <Home className="linkHomePage" fontSize="large" />
            </IconButton>
          </Link>
          {
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
            </List>
          }
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
