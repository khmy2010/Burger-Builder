import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 1,
    cheese: 1,
    meat: 1.50,
    bacon: 2
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 1
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({
           ingredients: updatedIngredients,
           totalPrice: updatedPrice 
        });
    };

    removeIngredientHandler = (type) => {
        this.setState((prevState, props) => {
            const currentCount = prevState.ingredients[type];

            if (currentCount > 0) {
                const updatedCount = currentCount - 1;

                const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
                
                const updatedIngredients = {
                    ...this.state.ingredients
                }
                updatedIngredients[type] = updatedCount;
    
                return {
                    ingredients: updatedIngredients,
                    totalPrice: updatedPrice
                }            
            }
            else {
                return {
                    ...prevState
                }
            }

        });
    };

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    ingredients={this.state.ingredients} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;