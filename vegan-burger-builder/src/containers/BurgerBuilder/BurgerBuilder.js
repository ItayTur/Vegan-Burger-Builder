import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
        salad: 1,
        "veggie-bacon": 1,
        "soy-cheese": 2,
        "beyond-meat": 2
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