import React from "react";
import { connect } from "react-redux";

import "./collection.styles.scss";
import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({ //optinal argument ownProps which is the props of the component that we are wrapping in connect
    collection: selectCollection(ownProps.match.params.collectionId)(state) //with first argument it firstly returns createSelector function and then we pass a state as an argument
});


export default connect(mapStateToProps)(CollectionPage);