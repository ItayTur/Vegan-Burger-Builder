import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import validationRules from '../../../enums/validationRules';
import classes from './ContactData.module.css';

class ContactData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form: {
                name: this.getInputObj('text', 'Your Name', {
                    [validationRules.required]: validationRules.required, 
                    [validationRules.minLength]: 5,
                    [validationRules.maxLength]: 10
                }, 'name'),
                email: this.getInputObj('email', 'Your Email', {
                    [validationRules.required]: validationRules.required, 
                    [validationRules.minLength]: 5,
                    [validationRules.maxLength]: 10
                }, 'email'),
                street: this.getInputObj('text', 'Street', {
                    [validationRules.required]: validationRules.required, 
                    [validationRules.minLength]: 5,
                    [validationRules.maxLength]: 10
                }, 'street'),
                ZIP: this.getInputObj('text', 'ZIP Code', {
                    [validationRules.required]: validationRules.required, 
                    [validationRules.minLength]: 5,
                    [validationRules.maxLength]: 10
                }, 'zip code'),
                country: this.getInputObj('text', 'Country', {
                    [validationRules.required]: validationRules.required, 
                    [validationRules.minLength]: 5,
                    [validationRules.maxLength]: 10
                }, 'country'),
                deliveryMethod: {
                    elementtype: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                        ]
                    },
                    validationRules: {},
                    value: 'fastest',
                    isValid: true
                }
            },
            isFormValid: false,
            ingredients: this.props.ingredients
        };
    }

    getInputObj = (elementtype, placeholder, validationRules, valueType, value = '') => ({
        elementtype,
        elementConfig: {
            elementtype,
            placeholder,
        },
        validationRules,
        value,
        valueType,
        isValid: false,
        isTouched: false
    });

    getFormData = () => {
        const formData = {};
        for (let inputId in this.state.form) {
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
        const clonedForm = { ...this.state.form };
        const clonedInput = { ...clonedForm[inputIdentifier] };

        clonedInput.value = event.target.value;
        clonedInput.isValid = this.checkValidity(clonedInput.value, clonedInput.validationRules)
        clonedInput.isTouched = true;
        clonedForm[inputIdentifier] = clonedInput;
        const isFormValid = this.isFormValid(clonedForm);
        this.setState({ form: clonedForm, isFormValid });
    }

    checkValidity = (value, validations) => {
        let isValid = true;
        if (validations[validationRules.required]) {
            isValid = value.trim().length > 0;
        }
        if (validations[validationRules.maxLength]) {
            isValid = value.length <= validations[validationRules.maxLength] && isValid;
        }
        if (validations[validationRules.minLength]) {
            isValid = value.length >= validations[validationRules.minLength] && isValid;
        }

        return isValid;
    };

    isFormValid = form => {
        let isValid = true;

        for(let fieldKey in form) {
            isValid = form[fieldKey].isValid && isValid;
        }

        return isValid;
    }

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
                    value={inputElement.config.value}
                    invalid={!inputElement.config.isValid}
                    valueType={inputElement.config.valueType}
                    shouldValidate={inputElement.config.validationRules}
                    isTouched={inputElement.config.isTouched} />
            })}
            <Button disabled={!this.state.isFormValid} btnType='Success' clicked={this.orderHandler}>Order</Button>
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