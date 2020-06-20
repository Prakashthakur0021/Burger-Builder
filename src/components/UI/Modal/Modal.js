import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary/Auxilliary";

class Modal extends Component {
  shouldComponentUpdate = (prevProps, prevState) => {
    return prevProps.show !== this.props.show;
  };

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} drop={this.props.purchaseCancel} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show
              ? "translateY(-10vh)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
