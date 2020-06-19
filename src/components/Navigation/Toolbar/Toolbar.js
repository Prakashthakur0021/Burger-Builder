import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = () => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <NavigationItems />
  </header>
);

export default toolbar;
