import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igkeys) => {
      return [...Array(props.ingredients[igkeys])].map((_, i) => {
        return <BurgerIngredient key={igkeys + i} type={igkeys} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
