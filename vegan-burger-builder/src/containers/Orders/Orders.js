import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import classes from './Orders.module.css';

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                console.log(response.data);
                let fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({data: response.data[key], id: key})
                };
                this.setState({isLoading: false, orders: fetchedOrders});
            })
            .catch( error => this.setState({isLoading: false}));
    }

    render() {
        const orders = this.state.isLoading ? <Spinner/> : 
        this.state.orders.map(order => (<Order ingredients={order.data.ingredients} 
            key={order.id}
             totalPrice={order.data.price} />) )
        return <div className={classes.Orders}>
            {orders}
        </div>
    }
}

export default WithErrorHandler(Orders, axios);