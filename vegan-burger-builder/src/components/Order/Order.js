import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({ingredientName: ingredient, amount: props.ingredients[ingredient]})
    }

    const outputIngredients = ingredients.map(ig => {
        return <span key={ig.ingredientName} style={{
            textTransform: "capitalize",
            border: "1px solid #ccc",
            padding: "8px",
            margin: "0 5px",
            display: "inline-block"
        }}>
            {ig.ingredientName}: {ig.amount}
        </span>
    });
    return (
        <div className={classes.Order}>
            ingredients: {outputIngredients}
            <p>Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;

