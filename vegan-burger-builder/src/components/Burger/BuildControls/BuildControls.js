import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {lable: 'Salad', type: 'salad'},
    {lable: 'Soy-Cheese', type: 'soy-cheese'},
    {lable: 'Veggie-Bacon', type: 'veggie-bacon'},
    {lable: 'Beyond-Meat', type: 'beyond-meat'}
];
const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        {controls.map(ctrl=>{
            return <BuildControl 
            key={ctrl.lable} 
            lable={ctrl.lable}
            added={()=>props.added(ctrl.type)}
            removed={()=>props.removed(ctrl.type)}
            disabledInfo={props.disabledInfo[ctrl.type]}/>
        })}
    </div>
};

export default buildControls;