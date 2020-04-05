import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
    const {isAuth} = this.props;
    return (
      <>
        <Toolbar drawerToggled={this.drawerToggleHandler} isAuth={isAuth}/>
        <SideDrawer
          cancled={this.sideDrawerClosedHandler}
          open={this.state.showSideDrower}
          isAuth={isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
