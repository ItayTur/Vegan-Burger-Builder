import React from 'react';

const orderSummary = (props) => {
    const orderDetails = Object.keys(props.ingredients)
    .map(ingKey => <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}: </span> 
    {props.ingredients[ingKey]}</li>) 
    return (
        <>
            <h3>Your Order</h3>
            <span >A delicious burger with the following ingredients:</span>
            <ul>
                {orderDetails}
            </ul>
            Would you like to check out?
        </>
    );
}

export default orderSummary;