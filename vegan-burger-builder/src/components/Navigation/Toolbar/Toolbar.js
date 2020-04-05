import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ManuButton from '../SideDrawer/ManuButton/ManuButton';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <ManuButton clicked={props.drawerToggled}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </header>
  );
};

export default toolbar;
