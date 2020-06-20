import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
