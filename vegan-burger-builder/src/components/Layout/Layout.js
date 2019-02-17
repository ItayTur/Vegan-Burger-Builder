import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrower: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrower: false });
  };

  drawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrower: !prevState.showSideDrower }));
  };
  render() {
    return (
      <>
        <Toolbar drawerToggled={this.drawerToggleHandler} />
        <SideDrawer
          cancled={this.sideDrawerClosedHandler}
          open={this.state.showSideDrower}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
