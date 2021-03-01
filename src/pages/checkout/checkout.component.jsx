import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";


import "./checkout.styles.scss";
import CartItem from "../../components/cart-item/cart-item.component";

const CheckoutPage = ({ cartItems, total }) => ( //destructured from props.cartItems and props.total
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )
        }
        <div className="total">
            <span>TOTAL: ${total}</span>
        </div>
        <StripeCheckoutButton price={total} />
        <div className="test-warning">
            *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 12/21 - CVV: 123
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })

export default connect(mapStateToProps)(CheckoutPage);