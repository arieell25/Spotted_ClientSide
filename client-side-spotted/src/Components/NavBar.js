import  React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  Typography,
  ListItem,
  ListItemText,
  Button
} from "@material-ui/core";

import Menu from '@material-ui/core/Menu';
import { userService } from '../Service/UserService'
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Signup from './Signup';
import Login from './Login'

const useStyles = makeStyles({
  logo: {
    fontSize: `24px`,
    textDecoration: `none`,
    color: `linear-gradient(45deg,#C5F836, #3AA4D1)`,
    textDecoration: `none`,
    textTransform: `uppercase`,
  },
  navDisplayFlex: {
    display: `flex`,
    // justifyContent: `space-between`,
    // position: `relative`,
    // left: `70px`,
    // bottom: `20px`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
  },
});

const navLinks = [
  { title: `Report Encounter`, path: `/AddEncounter` },
  { title: `My Encounters`, path: `/` },
  { title: `All Encounters`, path: `/EncountersBoard` },
  { title: `All Identified `, path: `/IdentifiedBoard` },

  // { title: `EncounterProfile`, path: `/EncounterProfile` },
  // { title: `Report Identified Encounter`, path: `/AddIdentifiedEncounter` },
];

const NavBar = () => {
  const [anchorElL, setAnchorElL] = useState(null);
  const [anchorSignup, setAnchorSignup] = useState(null);

  const [islogin, setislogin] = useState(null);

  const classes = useStyles();
  useEffect(() => {}, [islogin]);

  const handleClickL = event => {
    setAnchorElL(event.currentTarget);
  };

  const handleClickS = event => {
    setAnchorSignup(event.currentTarget);
    setislogin(true);
  };

  const handleCloseS = () => { 
    setislogin(true);
    setAnchorSignup(null);  
  }
  const handleCloseL = () => { setAnchorElL(null); }
  
  function handleLogoutClick(e) {
    userService.logout();
    window.location.reload();

  }

  return (
    <AppBar position="static" style={{ backgroundColor: `#252529` }}> 
      <Toolbar className="toolBar">
          <Link className={classes.logo} to="/HeaderTitle">
            <h3>spotted</h3>
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
        {!userService.isLoggedIn()  && (
          <div className="logindiv">
         <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClickL}
              size="small"
              // style={{left: '30%'}}
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
           </div>)}
        {userService.isLoggedIn()  && (
         <div className="logindiv">
         <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleLogoutClick}
              size="small"
              // style={{left: '30%'}}
            >
              Logout
        </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              size="small"
              // style={{color: 'white'}}
              >
              {userService.getLocalStorageUser()}          
            </Button>
            </div>
    
            )}
            <Menu
              id="simple-menu"
              anchorEl={anchorElL}
              keepMounted
              open={Boolean(anchorElL)}
              onClose={handleCloseL}
            >
            <Login onSubmitC={handleCloseL}/> 
          </Menu>
          <Menu
              id="simple-menu"
              anchorEl={anchorSignup}
              keepMounted
              open={Boolean(anchorSignup)}
              onClose={handleCloseS}
            >
            <Signup onSubmitC={handleCloseS}/> 
          </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
