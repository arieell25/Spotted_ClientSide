import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Sidebar from './components/SideBar';
// import logo from "../../assets/images/logo.png";
import routes from "./routes.js";

import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";


const useStyles = makeStyles(styles);

export default function AdminDashboard(...rest ) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [color, setColor] = useState("blue");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

//   if (!photos) return <GradientCircularProgress />
//   else {
    return (
<div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Spotted"}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />

      </div>  
    );
}
