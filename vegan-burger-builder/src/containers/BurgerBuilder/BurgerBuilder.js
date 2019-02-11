import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  "soy-cheese": 0.4,
  "beyond-meat": 1.3,
  "veggie-bacon": 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      "veggie-bacon": 0,
      "soy-cheese": 0,
      "beyond-meat": 0
    },
    totalPrice: 4,
    isPurchaseable: false,
    isPurchasing: false
  };

  updatePurchaseState (ingredients) {
      const sum = Object.keys( ingredients )
      .map(ingKey => {
          return ingredients[ingKey]
      })
      .reduce((sum, el)=> {
        return sum + el;
      },0)

      this.setState({isPurchaseable: sum>0});
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
    this.setState({isPurchasing: true});
  }

  render() {
    const disableds = {
        ...this.state.ingredients
    };

    for (let key in disableds) {
        disableds[key] = this.state.ingredients[key]<=0;
    }

    return (
      <>
        <Modal show={this.state.isPurchasing}>
            <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
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
    );
  }
}

export default BurgerBuilder;
