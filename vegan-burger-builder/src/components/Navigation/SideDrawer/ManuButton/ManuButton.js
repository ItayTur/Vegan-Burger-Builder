import React from 'react';
import classes from './ManuButton.module.css';

const manuButton = (props) => (
    <div className={classes.ManuButton} onClick={props.clicked}>
     <div></div>
     <div></div>
     <div></div>
    </div>
);

export default manuButton;