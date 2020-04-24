import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

import Burger from '../../Burger/Burger'
import BuildControls from '../../Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state ={
        
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        showSide: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey] 
        })
        .reduce((sum, el) =>{
             return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0})
    }    

    
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        let updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCounted;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <=0){
            return
        }

        const updatedCounted = oldCount - 1;
        let updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCounted;  
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }

    purchaseCancleHandler = () =>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert("Purchesed")
    }

    showSideHandler = () =>{
        const show = this.state.showSide
        this.setState({showSide: !show})
    }

    render() {
        const disableInfo ={
            ...this.state.ingredients
        };
        for(let key in disableInfo){

            disableInfo[key] = disableInfo[key] <=0;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseCancled={this.purchaseCancleHandler}
                    purchaseContinue={this.purchaseContinueHandler} 
                    ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disbled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;