import React from 'react'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    
     const IngredientSummary = Object.keys(props.ingredients)
     .map(igKey =>{
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{[igKey]}</span>:{props.ingredients[igKey]}</li>
     });
     
    return (
        <Auxiliary>
           <h3>Your order</h3>
           <p>Ingredients:</p>
           <ul>
               {IngredientSummary}
            </ul> 
            <p><strong>Total Price: {props.price}$</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancled}>CANCLE</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
    )
}

export default OrderSummary