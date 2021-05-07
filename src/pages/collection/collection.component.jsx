import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import {
    CollectionPageContainer,
    CollectionTitle,
    CollectionItemsContainer
} from './collection.styles';

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection }) => {
    // useEffect(() => {
    //     console.log("I am subscribing");
    //     const unsubscribeFromCollections = firestore.collection("collections").onSnapshot(snapShot => console.log(snapShot));

    //     return () => { //clean up function, useEffect calls it when component unmounts; it mimics componentwillunmount();
    //         console.log("I am unsubscribing");
    //         unsubscribeFromCollections();
    //     };
    // }, []); // we pass an empty erray if we want to run it only once when it mounts

    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({ //optinal argument ownProps which is the props of the component that we are wrapping in connect
    collection: selectCollection(ownProps.match.params.collectionId)(state) //with first argument it firstly returns createSelector function and then we pass a state as an argument
});


export default connect(mapStateToProps)(CollectionPage);