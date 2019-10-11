import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import { connect } from 'react-redux';

import axios from '../../axios-orders';


class BurgerBuilder extends Component {
  state = {
    isPurchaseable: false,
    isPurchasing: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

    return sum > 0;
  }

  // addingIngredient = type => {
  //   const oldAmount = this.state.ingredients[type];
  //   const ingredientsToUpdate = { ...this.state.ingredients };
  //   ingredientsToUpdate[type] = oldAmount + 1;
  //   const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
  //   this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
  //   this.updatePurchaseState(ingredientsToUpdate);
  // };

  // removingIngredient = type => {
  //   const oldAmount = this.state.ingredients[type];
  //   if (oldAmount > 0) {
  //     const ingredientsToUpdate = { ...this.state.ingredients };
  //     ingredientsToUpdate[type] = oldAmount - 1;
  //     const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
  //     this.setState({ totalPrice: newPrice, ingredients: ingredientsToUpdate });
  //     this.updatePurchaseState(ingredientsToUpdate);
  //   }
  // };

  purchesHandler = () => {
    this.setState({ isPurchasing: true });
  }

  cancelHandler = () => {
    this.setState({ isPurchasing: false });
  }

  continueHandler = () => {

    // const searchParamIngredients = Object.keys(this.state.ingredients).map(igKey =>
    //   igKey + '=' + this.state.ingredients[igKey]).join('&') + '&totalPrice=' + this.props.price;
    // this.props.history.push('/checkout/?' + searchParamIngredients);
    this.props.history.push('/checkout');
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ isLoading: false, error: true });
    //   });
    this.props.fetchingIngredients();
  }

  render() {
    const disableds = {
      ...this.props.ingredients
    };

    for (let key in disableds) {
      disableds[key] = this.props.ingredients[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>cannot load ingredients</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = <>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          totalPrice={this.props.price}
          added={this.props.addingIngredient}
          removed={this.props.removingIngredient}
          disabledInfo={disableds}
          isPurchasable={this.updatePurchaseState(this.props.ingredients)}
          Purchasing={this.purchesHandler}
        />
      </>

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        continue={this.continueHandler}
        canceld={this.cancelHandler}
        totalPrice={this.props.price} />;

    }

    // if (this.state.isLoading) {
    //   orderSummary = <Spinner />
    // }


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

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  price: state.totalPrice,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addingIngredient: ingredientName => dispatch(burgerBuilderActions.addingIngredient(ingredientName)),
  removingIngredient: ingredientName => dispatch(burgerBuilderActions.addingIngredient(ingredientName)),
  fetchingIngredients: () => dispatch(burgerBuilderActions.fetchingIngredients())
})
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
