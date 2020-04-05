import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import validationRules from '../../../enums/validationRules';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
        const formData = this.getFormData();
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.startOrder(order, this.props.token);
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

        for (let fieldKey in form) {
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

        let form = this.props.isLoading ? <Spinner /> : <form> {
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

const mapStateToProps = state => {
    return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.orders.loading,
    isOrderSuccess: state.orders.isOrderSuccess,
    token: state.auth.token,
    userId: state.auth.userId
}}

const mapDispatchToProps = dispatch => ({
    startOrder: (orderData, token) => dispatch(actions.startOrder(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));