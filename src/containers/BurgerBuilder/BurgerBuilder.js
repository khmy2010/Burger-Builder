import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 1,
        purchasable: false,
        purchasing: false
    }

    updatePurchasable(ingredients) {
        const amount = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce((sum, qty) => {
            return sum + qty;
        }, 0);
        
        this.setState({
            purchasable: amount > 0
        });
    };

    purchaseHandler = () => {
        this.setState((prevState, props) => {
            return { purchasing: !prevState.purchasing };
        });
    };

    purchaseContinueHandler = () => {
        alert('FAT DIE YOU!!!!!!!');
    };

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

        this.updatePurchasable(updatedIngredients);
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
                this.updatePurchasable(updatedIngredients);

                return {
                    ingredients: updatedIngredients,
                    totalPrice: updatedPrice
                }
            }
            else { return { ...prevState } }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;