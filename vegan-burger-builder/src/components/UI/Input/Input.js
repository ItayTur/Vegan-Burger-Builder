import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputClasses = [classes.InputElement];
    let validationError = null;
    if (props.invalid && props.shouldValidate && props.isTouched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>
    }

    inputClasses = inputClasses.join(' ');

    const inputElement = inputs[props.elementtype](props.config, props.value, props.changed, inputClasses);


    return <div className={classes.Input}>
        <label className={classes.Lable}>{props.lable}</label>
        {inputElement}
        {validationError}
    </div>
}

const inputs = {
    text: (config, value, changed, inputClasses) => <input className={inputClasses} value={value} {...config} onChange={changed} />,
    email: (config, value, changed, inputClasses) => <input type='email' className={inputClasses} value={value} {...config} onChange={changed} />,
    select: (config, value, changed, inputClasses) => (<select className={inputClasses} onChange={changed}>
        {config.options.map(option => (
            <option key={option.value} value={option.value}>
                {option.displayValue}
            </option>))}
    </select>),
    textarea: (config) => <textarea {...config} />,
    password: (config, value, changed, inputClasses) => <input type='password' className={inputClasses} value={value} {...config} onChange={changed} />
};

export default input;