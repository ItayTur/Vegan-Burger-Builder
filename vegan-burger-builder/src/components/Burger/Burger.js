import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    let jsxIngredients = Object.keys(props.ingredients).map(ingredientKey=>[...Array(props.ingredients[ingredientKey])].
    map((_,i)=> { return <BurgerIngredient key={ingredientKey+i} type={ingredientKey}/>}))
    .reduce((arr, el)=> {
        return arr.concat(el);
    },[]);
    if(jsxIngredients.length === 0) {
        jsxIngredients = <p>Please insert ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
           { jsxIngredients }
           <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}

export default burger;