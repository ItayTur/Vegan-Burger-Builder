import React from 'react';

import classes from './Input.module.css';

const input = (props) => (
    <div className={classes.Input}>
        <label className={classes.Lable}>{props.lable}</label>
        {inputTypes[props.elementtype](props.config, props.value, props.changed)}
    </div>
)

const inputTypes = {
    text: (config, value, changed) => <input className={classes.InputElement} value={value} {...config} onChange={changed} />,
    email: (config, value, changed) => <input type='email' className={classes.InputElement} value={value} {...config} onChange={changed}/>,
    select: (config, value, changed) => (<select className={classes.InputElement} onChange={changed}>
        {config.options.map(option => (
            <option key={option.value} value={option.value}>
                {option.displayValue}
            </option>))}
    </select>),
    textarea: (config) => <textarea {...config} />
};

export default input;