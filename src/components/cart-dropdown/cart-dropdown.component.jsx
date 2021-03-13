import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";


import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer, CartDropdownButton } from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ?
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                    :
                    <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            }
        </CartItemsContainer>

        <CartDropdownButton
            onClick={() => {
                history.push("/checkout");
                dispatch(toggleCartHidden());
            }}
        > GO TO CHECKOUT
            </CartDropdownButton>
    </CartDropdownContainer>
);

// import "./cart-dropdown.styles.scss";

// const CartDropdown = ({ cartItems, history, dispatch }) => (
//     <div className="cart-dropdown">
//         <div className="cart-items">
//             {
//                 cartItems.length ?
//                     cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
//                     :
//                     <span className="empty-message">Your cart is empty</span>
//             }
//         </div>

//         <CustomButton
//             onClick={() => {
//                 history.push("/checkout");
//                 dispatch(toggleCartHidden());
//             }}
//         > GO TO CHECKOUT
//         </CustomButton>
//     </div>
// );


// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
//withRouter is HOC, it returns a component and takes a component as an argument(component that got returned from connect call)
//withRouter will be what passes the match, history and location objects into a component that being wrapped(CartDropdown)
//so we want a component that comes out of connect call receive match,history and location as props

