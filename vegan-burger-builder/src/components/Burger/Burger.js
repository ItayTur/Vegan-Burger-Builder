import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const burger = props => {
  let jsxIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      })
    ).reduce((arr, el) => { // befor this line we have array of arrays which is hard to
      //  run on. 
      //this line reduce all the inner array into one 
      //array so only one array with the jsx elemnts will be the output.
      return arr.concat(el);
    }, []);
  if (jsxIngredients.length === 0) {
    jsxIngredients = <p>Please insert ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {jsxIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
