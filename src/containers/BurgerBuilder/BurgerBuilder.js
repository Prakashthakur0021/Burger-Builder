import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = { 
    purchasing: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseConitnueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  };

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKeys) => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error? <p> Ingredient Can't be Loaded </p>: <Spinner/> ;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disable={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.props.price}
          purchaseConitnue={this.purchaseConitnueHandler}
        />
      );
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


const mapStateToProps = state => {
  console.log(state);
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
