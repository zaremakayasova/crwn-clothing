import React from "react";
import { CartItemContainer, CartItemImage, ItemDetailsContainer } from "./cart-item.styles";


const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt="item" />
        <ItemDetailsContainer>
            <span>{name}</span>
            <span>{quantity} x ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

// import "./cart-item.styles.scss";

// const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
//     <div className="cart-item">
//         <img src={imageUrl} alt="item" />
//         <div className="item-details">
//             <span>{name}</span>
//             <span>{quantity} x ${price}</span>
//         </div>
//     </div>
// );

export default React.memo(CartItem); // so if the same item is clicked and added to the cart CartItem does not rerender over and over again; it is memoized