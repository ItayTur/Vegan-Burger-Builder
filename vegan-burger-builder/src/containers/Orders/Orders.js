import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import classes from './Orders.module.css';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    // state = {
    //     orders: [],
    //     isLoading: true
    // };

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(response => {
        //         console.log(response.data);
        //         let fetchedOrders = [];
        //         for(let key in response.data) {
        //             fetchedOrders.push({data: response.data[key], id: key})
        //         };
        //         this.setState({isLoading: false, orders: fetchedOrders});
        //     })
        //     .catch( error => this.setState({isLoading: false}));
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        const orders = this.props.isLoading ? <Spinner/> : 
        this.props.orders.map(order => (<Order ingredients={order.ingredients} 
            key={order.id}
             totalPrice={order.price} />) )
        return <div className={classes.Orders}>
            {orders}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.orders.loading,
        orders: state.orders.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.startFetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));