import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
    totalPrice: 4
  };

  addingIngredient = type => {
    const oldAmount = this.state.ingredients[type];
    const ingredientsToUpdate = { ...this.state.ingredients };
    ingredientsToUpdate[type] = oldAmount + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
  };

  removingIngredient = type => {
    const oldAmount = this.state.ingredients[type];
    if (oldAmount > 0) {
      const ingredientsToUpdate = { ...this.state.ingredients };
      ingredientsToUpdate[type] = oldAmount - 1;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
      this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
    }
  };

  render() {
    const disableds = {
        ...this.state.ingredients
    };

    for (let key in disableds) {
        disableds[key] = this.state.ingredients[key]<=0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addingIngredient}
          removed={this.removingIngredient}
          disabledInfo={disableds}
        />
      </>
    );
  }
}

export default BurgerBuilder;
