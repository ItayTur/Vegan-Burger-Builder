import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Lable}>{props.lable}</div>
      <div className={classes.BuildControlBtns}>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabledInfo}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
      </div>
      
    </div>
  );
};

export default buildControl;
