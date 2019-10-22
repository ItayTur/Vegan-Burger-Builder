import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSumary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    continueHandler = () => {
        this.props.history.replace('/checkout/contactdata');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        // const quary = new URLSearchParams(this.props.location.search);
        // let ingredients = {};
        // let totalPrice = '';
        // for (let param of quary.entries()) {
        //     if (param[0] === 'totalPrice') {
        //         totalPrice = +param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }

        // this.setState({ ingredients, totalPrice });
    }

    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            summary = this.props.isOrderSuccess ?
                <Redirect to='/' /> : <div>
                    <CheckoutSummary
                        onContinue={this.continueHandler}
                        onCancel={this.cancelHandler}
                        ingredients={this.props.ings} />
                    {/* <Route path={this.props.match.path + '/contactdata'} 
         render={(props) => <ContactData ingredients={this.state.ingredients} 
         totalPrice={this.state.totalPrice} {...props}/>} /> */}
                    <Route path={this.props.match.path + '/contactdata'}
                        component={ContactData} />
                </div>;
        }
        return summary;
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    isOrderSuccess: state.orders.isOrderSuccess
});

export default connect(mapStateToProps)(Checkout);