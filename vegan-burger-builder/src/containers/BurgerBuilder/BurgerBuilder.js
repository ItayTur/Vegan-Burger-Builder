import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
        "salad":0,
        "veggie-bacon":0,
        "soy-cheese":0,
        "beyond-meat":0
        }
    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <div>Burger Control</div>
            </>
        );
    }
}

export default BurgerBuilder;