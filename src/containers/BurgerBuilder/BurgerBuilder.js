import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  INGREDIENT_PRICE = {
    salad: 10.5,
    bacon: 40.34,
    cheese: 10.29,
    meat: 20.4,
  };

  state = {
    ingredients: null,
    totPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-burger-4a92a.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConitnueHandler = () => {
    // alert("You Choose to Continue");
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price='+ this.state.totPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    })
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

    let orderSummary = <Spinner />;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.state.totPrice}
          purchaseConitnue={this.purchaseConitnueHandler}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          purchaseCancel={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
