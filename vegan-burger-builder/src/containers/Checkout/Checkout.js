import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSumary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: ''
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contactdata');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const quary = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let totalPrice = '';
        for (let param of quary.entries()) {
            if (param[0] === 'totalPrice') {
                totalPrice = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients, totalPrice });
    }

    render() {
        return <div>
            {this.state.ingredients ? <CheckoutSummary
                onContinue={this.continueHandler}
                onCancel={this.cancelHandler}
                ingredients={this.state.ingredients} /> : null}
            <Route path={this.props.match.path + '/contactdata'} 
            render={(props) => <ContactData ingredients={this.state.ingredients} 
            totalPrice={this.state.totalPrice} {...props}/>} />
        </div>
    }
}

export default Checkout;