/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

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
import Signup from "./Signup";
import Login from "./Login";

const useStyles = makeStyles((them) => ({
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
}));

const navLinksPub = [
  { key: "1", title: `Report Encounter`, path: `/AddEncounter` },
  { key: "2", title: `Encounters`, path: `/EncountersBoard` },
];
const navLinksUser = [
  { key: "1", title: `Report Encounter`, path: `/AddEncounter` },
  { key: "2", title: `Encounters`, path: `/EncountersBoard` },
  { key: "3", title: `My Encounters`, path: `/UserEncountersBoard` },
  { key: "4", title: `Individuals `, path: `/IdentifiedBoard` },
];

const NavBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [selectedKey, setSelectedKey] = useState(
    navLinksUser.find((item) => window.location.pathname.startsWith(item.path))
      ? navLinksUser.find((item) =>
          window.location.pathname.startsWith(item.path)
        ).key
      : 0
  );
  const [anchorElL, setAnchorElL] = useState(null);
  const [anchorSignup, setAnchorSignup] = useState(null);
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [islogin, setislogin] = useState(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (userService.isLoggedIn()) {
      setNavLinks(navLinksUser);
    } else {
      setNavLinks(navLinksPub);
    }

    if (window.location.pathname.startsWith(`/UploadPhoto`)) {
      setSelectedKey(navLinksUser[1].key);
    } else if (window.location.pathname.startsWith(`/IdentifyPhoto`)) {
      setSelectedKey(navLinksUser[1].key);
    } else if (window.location.pathname.startsWith(`/IdentifiedProfile`)) {
      setSelectedKey(navLinksUser[3].key);
    }else if (window.location.pathname.startsWith(`/EncounterProfile`)) {
      setSelectedKey(navLinksUser[1].key);
    } else {
      setSelectedKey(
        navLinksUser.find((item) =>
          window.location.pathname.startsWith(item.path)
        )
          ? navLinksUser.find((item) =>
              window.location.pathname.startsWith(item.path)
            ).key
          : setSelectedKey(navLinksUser[1].key)

      );
    }
  }, [location, islogin]);

  const onClickMenu = (item) => {
    const clicked = navLinksUser.find((_item) => _item.key === item.key);
    history.push(clicked.path);
  };

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

  return (
    <AppBar position="static" style={{ backgroundColor: `#252529` }}>
      <Toolbar className="toolBar">
        <a href="/EncountersBoard" >
          <img
            src="logo192.png"
            alt="logo"
            style={{ height: 50, margin: 10, width: 245 }}
          />
        </a>
        <div className={classes.root}>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map((item) => (
              <a href={item.path} key={item.key} className={classes.linkText}>
                <ListItem
                  button
                  // selected={selectedKey === item.key}
                  selected={selectedKey === item.key}
                  onClick={(event) => onClickMenu(item)}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              </a>
            ))}
            {/* {!userServi.isLoggedIn() &&
              navLinksUser.map((item) => 
                
                <a href={item.path} key={item.key} className={classes.linkText}>
                  <ListItem
                    button
                    selected={selectedKey === item.key}
                    onClick={(event) => onClickMenu(item)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                </a>
                  
              
              )
              } */}
          </List>
        </div>
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
              {userService.getLocalStorageUser().firstName}
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
