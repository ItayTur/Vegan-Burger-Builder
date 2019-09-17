import React, { Component } from 'react';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    
    render() {
        const orderDetails = Object.keys(this.props.ingredients)
    .map(ingKey => <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}: </span> 
    {this.props.ingredients[ingKey]}</li>) 
        return (<>
            <h3>Your Order</h3>
            <span >A delicious burger with the following ingredients:</span>
            <ul>
                {orderDetails}
            </ul>
            <strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong>
            <p>Would you like to check out?</p>
            
        <Button btnType="Danger" clicked={this.props.canceld}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
        </>
        );
    }
}

export default OrderSummary;