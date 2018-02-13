import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = props.ingredients; console.log(ingredients);

    const ingredientSummary = Object.keys(ingredients).map((ingredient, index) => {
        return (
            <li key={ingredient + index}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>
                : <strong style={{color: '#a54382'}}>{ingredients[ingredient]}</strong>
            </li>
        );
    });

    console.log(ingredientSummary);

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Inside got this lah</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    );
};

export default orderSummary;