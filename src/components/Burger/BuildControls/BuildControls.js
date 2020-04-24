import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Chesee', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(crtl =>(
                
                <BuildControl 
                key={crtl.label} 
                label={crtl.label}
                added={() => props.ingredientAdded(crtl.type)}
                removed={() => props.ingredientRemoved(crtl.type)} 
                disabled={props.disbled[crtl.type]}
                 />
            ))}
            
            <button disabled={!props.purchasable} className={classes["OrderButton"]} onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default BuildControls