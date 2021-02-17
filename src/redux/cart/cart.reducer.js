import { connect } from "react-redux";
import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload] //first spreading the existing cart items(array values) and any additional values we add at the end
            }
        default:
            return state;
    }
}

export default cartReducer;