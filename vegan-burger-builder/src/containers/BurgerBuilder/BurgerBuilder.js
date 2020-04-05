import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import * as actions from '../../store/actions/index';
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
    if (this.props.isAuth) {
      this.setState({ isPurchasing: true });
    } else {
      this.props.updateAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }
  }

  cancelHandler = () => {
    this.setState({ isPurchasing: false });
  }

  continueHandler = () => {

    // const searchParamIngredients = Object.keys(this.state.ingredients).map(igKey =>
    //   igKey + '=' + this.state.ingredients[igKey]).join('&') + '&totalPrice=' + this.props.price;
    // this.props.history.push('/checkout/?' + searchParamIngredients);
    this.props.orderInit();
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
    this.props.updateAuthRedirectPath('/')
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
          isAuth={this.props.isAuth}
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
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  addingIngredient: ingredientName => dispatch(actions.addingIngredient(ingredientName)),
  removingIngredient: ingredientName => dispatch(actions.addingIngredient(ingredientName)),
  fetchingIngredients: () => dispatch(actions.fetchingIngredients()),
  orderInit: () => dispatch(actions.orderInit()),
  updateAuthRedirectPath: (path) => dispatch(actions.authRedirectPath(path))
})
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
