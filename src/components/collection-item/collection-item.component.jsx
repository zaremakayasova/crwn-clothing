import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className="collection-item">
            <div
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton
            className="custom-button"
             onClick={() => addItem(item)} inverted>
                Add to cart
                </CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);

//we are creating function that is props.addItem that will go into CollectionItem component as addItem function that we need to leverage
//whenever we need dispatch or call this function addItem, this function will receive the item as the property,
//pass it into addItem creator, which gives us back that object, where the type is equal addItem and the paylod = item passed in
//then we dispatch that new object into our store and it goes through redux flow

//so every time we click we are getting our addItem action to dispatch
//and our cart is getting updated in its cartItems in cart reducer