import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';

import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  "soy-cheese": 0.4,
  "beyond-meat": 1.3,
  "veggie-bacon": 0.7
};

class BurgerBuilder extends Component {
  state = {
    singredients: null,
    totalPrice: 4,
    isPurchaseable: false,
    isPurchasing: false,
    isLoading: false,
    error: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

    this.setState({ isPurchaseable: sum > 0 });
  }

  addingIngredient = type => {
    const oldAmount = this.state.ingredients[type];
    const ingredientsToUpdate = { ...this.state.ingredients };
    ingredientsToUpdate[type] = oldAmount + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
    this.updatePurchaseState(ingredientsToUpdate);
  };

  removingIngredient = type => {
    const oldAmount = this.state.ingredients[type];
    if (oldAmount > 0) {
      const ingredientsToUpdate = { ...this.state.ingredients };
      ingredientsToUpdate[type] = oldAmount - 1;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
      this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
      this.updatePurchaseState(ingredientsToUpdate);
    }
  };

  purchesHandler = () => {
    this.setState({ isPurchasing: true });
  }

  cancelHandler = () => {
    this.setState({ isPurchasing: false });
  }

  continueHandler = () => {
    
    const searchParamIngredients = Object.keys(this.state.ingredients).map(igKey =>
      igKey + '=' + this.state.ingredients[igKey]).join('&') + '&totalPrice=' + this.state.totalPrice;
    this.props.history.push('/checkout/?' + searchParamIngredients);
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ isLoading: false, error: true });
      });
  }

  render() {
    const disableds = {
      ...this.state.ingredients
    };

    for (let key in disableds) {
      disableds[key] = this.state.ingredients[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>cannot load ingredients</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          added={this.addingIngredient}
          removed={this.removingIngredient}
          disabledInfo={disableds}
          isPurchasable={this.state.isPurchaseable}
          Purchasing={this.purchesHandler}
        />
      </>

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        continue={this.continueHandler}
        canceld={this.cancelHandler}
        totalPrice={this.state.totalPrice} />;

    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />
    }


    return (
      <>
        <Modal show={this.state.isPurchasing} cancled={this.cancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
