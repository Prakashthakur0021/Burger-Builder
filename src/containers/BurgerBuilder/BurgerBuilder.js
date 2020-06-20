import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

class BurgerBuilder extends Component {
  INGREDIENT_PRICE = {
    salad: 10.5,
    bacon: 40.34,
    cheese: 10.29,
    meat: 20.4,
  };

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totPrice: 20,
    purchasable: false,
    purchasing: false,
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConitnueHandler = () => {
    alert("You Choose to Continue");
  };

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKeys) => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateIngredient = { ...this.state.ingredients };
    const priceAddition = this.INGREDIENT_PRICE[type];
    const updateCount = oldCount + 1;
    updateIngredient[type] = updateCount;
    let updatePrice = this.state.totPrice;
    updatePrice += priceAddition;
    this.setState({ ingredients: updateIngredient, totPrice: updatePrice });
    this.updatePurchasable(updateIngredient);
  };

  RemoveIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateIngredient = { ...this.state.ingredients };
    const priceDeduction = this.INGREDIENT_PRICE[type];
    const updateCount = oldCount - 1;
    updateIngredient[type] = updateCount;
    let updatePrice = this.state.totPrice;
    updatePrice -= priceDeduction;
    this.setState({ ingredients: updateIngredient, totPrice: updatePrice });
    this.updatePurchasable(updateIngredient);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          purchaseCancel={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.state.totPrice}
            purchaseConitnue={this.purchaseConitnueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.RemoveIngredientHandler}
          disable={disabledInfo}
          price={this.state.totPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
