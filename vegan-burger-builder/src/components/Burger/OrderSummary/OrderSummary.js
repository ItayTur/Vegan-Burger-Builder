import React from 'react';
import Button from '../../UI/Button/Button';


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
            <strong>Total Price: {props.totalPrice.toFixed(2)}$</strong>
            <p>Would you like to check out?</p>
            
        <Button btnType="Danger" clicked={props.canceld}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </>
    );
}

export default orderSummary;