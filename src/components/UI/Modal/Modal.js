import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary";

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} drop={props.purchaseCancel} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
