import React from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKeys) => {
    return (
      <li key={igKeys}>
        <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
          {igKeys}
        </span>
        : {props.ingredients[igKeys]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients :</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseConitnue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
