import React from "react";

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const sideDrawer = props => {

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <>
      <Backdrop show={props.open} cancled={props.cancled}/>
      <div onClick={props.cancled} className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
