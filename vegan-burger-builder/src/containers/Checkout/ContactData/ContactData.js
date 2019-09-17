import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import validationRulesEnum from '../../../enums/validationRules';
import classes from './ContactData.module.css';

class ContactData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form: {
                name: this.getInputObj('text', 'Your Name'),
                email: this.getInputObj('email', 'Your Email'),
                street: this.getInputObj('text', 'Street'),
                ZIP: this.getInputObj('text', 'ZIP Code', {[validationRulesEnum.required]: validationRulesEnum.required}),
                country: this.getInputObj('text', 'Country'),
                deliveryMethod: {
                    elementtype: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                        ]
                    },
                    value: ''
                }
            },
            ingredients: this.props.ingredients
        };
    }

    getInputObj = (elementtype, placeholder, validtionRules, value = '') => ({
        elementtype,
        elementConfig: {
            elementtype,
            placeholder,
        },
        validtionRules: {
            ...validtionRules
        },
        value,
        isValid: false
    });

    getFormData = () => {
        const formData = {};
        for(let inputId in this.state.form) {
            formData[inputId] = this.state.form[inputId].value
        }

        return formData;
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const formData = this.getFormData();
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };


        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ isLoading: false })
                this.props.history.goBack();
            })
            .catch(error => {
                this.setState({ isLoading: false })
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const clonedForm = {...this.state.form};
        const clonedInput = {...clonedForm[inputIdentifier]};

        clonedInput.value = event.target.value;
        clonedInput.isValid = this.checkValidity(clonedInput.value, clonedInput.validtionRules)
        clonedForm[inputIdentifier] = clonedInput;
        this.setState({form: clonedForm});
    }

    checkValidity = (value, validationRules) => {
        let isValid = false;
        if(validationRules[validationRulesEnum.required]){
            isValid = value.trim().length > 0;
        }
        console.log(isValid);

        return isValid;
    };

    render() {

        const inputElements = [];
        for (let key in this.state.form) {
            inputElements.push({
                id: key,
                config: this.state.form[key]
            });
        };

        let form = this.state.isLoading ? <Spinner /> : <form> {
            inputElements.map((inputElement) => {
                return <Input
                    key={inputElement.id}
                    changed={(event) => this.inputChangedHandler(event, inputElement.id)}
                    elementtype={inputElement.config.elementtype}
                    config={inputElement.config.elementConfig}
                    value={inputElement.config.value}/>
            })}
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
        </form>;

        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;