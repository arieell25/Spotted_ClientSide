import  React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button
} from "@material-ui/core";
import UserMenu from './UserMenu'
import Menu from '@material-ui/core/Menu';
import { userService } from '../Service/UserService'
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Signup from './Signup';
import Login from './Login'

const useStyles = makeStyles({
  logo: {
    fontSize: `24px`,
    textDecoration: `none`,
    color: `linear-gradient(45deg,#C5F836, #3AA4D1)`,
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

const NavBar = (...rest) => {
  const [anchorElL, setAnchorElL] = useState(null);
  const [anchorSignup, setAnchorSignup] = useState(null);
  const [open, setOpen] = useState(false);
  const [islogin, setislogin] = useState(null);
  const anchorRef = useRef(null);
  const [drawrOpen, setdrawrOpen] = useState(false);
  const [color, setColor] = useState("blue");

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
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setdrawrOpen(!drawrOpen);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: `#252529` }}> 
          {/* <Sidebar
            routes={routes}
            logoText={"Spotted"}
            handleDrawerToggle={ handleDrawerToggle}
            open={drawrOpen}
            color={color}
            {...rest}
      /> */}
      <Toolbar className="toolBar">
          {/* <Link className={classes.logo} to="/HeaderTitle">
            <h3>spotted</h3>
            <img src="logo.png" alt="logo" ></img>
          </Link> */}
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
              ))
          }
            {!userService.isLoggedIn() &&
              navLinksPub.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))
          }
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
              aria-haspopup="true"
              size="small"
              onClick={handleToggle}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              >
              {userService.getLocalStorageUser()}          
            </Button>
            <UserMenu
            open={ open }
            setOpen={ setOpen }
            handleClose={ handleClose }
            anchorRef = { anchorRef}
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
