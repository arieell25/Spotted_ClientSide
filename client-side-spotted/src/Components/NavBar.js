import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import Menu from "@material-ui/core/Menu";
import { userService } from "../Service/UserService";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const useStyles = makeStyles({
  logo: {
    fontSize: `24px`,
    textDecoration: `none`,
    color: `linear-gradient(45deg,#C5F836, #3AA4D1)`,
    textTransform: `uppercase`,
  },
  navDisplayFlex: {
    display: `flex`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
  },
});

const navLinksPub = [
  { title: `Report Encounter`, path: `/AddEncounter` },
  { title: `Encounters`, path: `/EncountersBoard` },
];
const navLinksUser = [
  { title: `Report Encounter`, path: `/AddEncounter` },
  { title: `My Encounters`, path: `/UserEncountersBoard` },
  { title: `Encounters`, path: `/EncountersBoard` },
  { title: `Individuals `, path: `/IdentifiedBoard` },
];

const NavBar = () => {
  const [anchorElL, setAnchorElL] = useState(null);
  const [anchorSignup, setAnchorSignup] = useState(null);
  const [open, setOpen] = useState(false);
  const [islogin, setislogin] = useState(null);
  const anchorRef = useRef(null);

  const classes = useStyles();
  useEffect(() => {}, [islogin]);

  const handleClickL = (event) => {
    setAnchorElL(event.currentTarget);
  };

  const handleClickS = (event) => {
    setAnchorSignup(event.currentTarget);
    setislogin(true);
  };

  const handleCloseS = () => {
    setislogin(true);
    setAnchorSignup(null);
  };
  const handleCloseL = () => {
    setAnchorElL(null);
    window.location.reload();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  // const handleDrawerToggle = () => {
  //   setdrawrOpen(!drawrOpen);
  // };

  return (
    <AppBar position="static" style={{ backgroundColor: `#252529` }}>
      <Toolbar className="toolBar">
        <NavLink to="/Home" exact>
          <img
            src="logo192.png"
            alt="logo"
            style={{ height: 50, margin: 10, width: 245 }}
          />
        </NavLink>
        {
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {userService.isLoggedIn() &&
              navLinksUser.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
            {!userService.isLoggedIn() &&
              navLinksPub.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
          </List>
        }
        {!userService.isLoggedIn() && (
          <div className="logindiv">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickL}
              size="small"
            >
              Login
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickS}
              size="small"
              // style={{left: '25%'}}
            >
              Signup
            </Button>
          </div>
        )}
        {userService.isLoggedIn() && (
          <div className="logindiv">
            <Button
              aria-haspopup="true"
              size="small"
              onClick={handleToggle}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
            >
              {userService.getLocalStorageUser()}
            </Button>
            <UserMenu
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              anchorRef={anchorRef}
            />
          </div>
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorElL}
          keepMounted
          open={Boolean(anchorElL)}
          onClose={handleCloseL}
        >
          <Login onSubmitC={handleCloseL} />
        </Menu>
        <Menu
          id="simple-menu"
          anchorEl={anchorSignup}
          keepMounted
          open={Boolean(anchorSignup)}
          onClose={handleCloseS}
        >
          <Signup onSubmitC={handleCloseS} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
