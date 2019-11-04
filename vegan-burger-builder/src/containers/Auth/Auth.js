import React, { Component } from 'react';
import validationRules from '../../enums/validationRules';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            controls: {
                email: this.getInputObj('email', 'enter email', {
                    [validationRules.required]: true
                }, 'email'),
                password: this.getInputObj('password', 'enter password', {
                    [validationRules.required]: true,
                    [validationRules.minLength]: 6
                }, 'password')
            }
        }
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


    inputChangedHandler = (event, id) => {
        event.preventDefault();
        const updatedControls = {...this.state.controls}
        const updatedInput = {...updatedControls[id]};
        
        updatedInput.value = event.target.value;
        updatedInput.isValid = this.checkValidation(event.target.value, updatedControls[id].validationRules);
        updatedInput.isTouched = true;

        updatedControls[id] = updatedInput;
        
        this.setState({controls: updatedControls})
    }

    checkValidation = (value, validations) => {
        let isValid = true;
        if(validations[validationRules.required]) {
            isValid = value.trim() !== '';
        }

        if(validations[validationRules.minLength]) {
            isValid = value.length >= validations[validationRules.minLength] && isValid;
        }

        return isValid;
    }
    render() {
        const controlsArray = [];
        for (let control in this.state.controls) {
            controlsArray.push({ id: control, config: this.state.controls[control] })
        }

        const form = controlsArray.map(control => (
            <Input key={control.id}
                changed={(event) => this.inputChangedHandler(event, control.id)}
                elementtype={control.config.elementtype}
                config={control.config.elementConfig}
                value={control.config.value}
                invalid={!control.config.isValid}
                valueType={control.config.valueType}
                shouldValidate={control.config.validationRules}
                isTouched={control.config.isTouched} />
        ));

        return <div>
            <form className={classes.Auth}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
        </div>
    }
}

export default Auth;