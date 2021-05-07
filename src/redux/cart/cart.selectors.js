//Selectors can provide performance optimizations 
//so our components are not getting rerendered whenever state changes that unrelated to our component(if user state chnages, our item components dont get rerendered)
//A selector is a function that accepts Redux state as an argument
// and returns data that is derived from that state.

import { createSelector } from "reselect";

const selectCart = state => state.cart; //input selector

export const selectCartItems = createSelector(
    [selectCart], //first argument can be either an array of our input selectors
    cart => cart.cartItems //second argument is a function that will return value we want out of this selector
    //parameter of this function is output of input selector in the array
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
);