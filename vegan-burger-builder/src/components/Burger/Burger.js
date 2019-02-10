import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    const jsxIngredients = Object.keys(props.ingredients)
                                 .map(ingredientKey=>Array(props[ingredientKey]).map((_,i)=> {return <BurgerIngredient key={ingredientKey+i} type={ingredientKey}/>}))
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
           { jsxIngredients }
           <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}

export default burger;