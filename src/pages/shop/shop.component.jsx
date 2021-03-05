import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/shop.actions";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

// const ShopPage= ({ match }) => (
//     //we have access to the match object because inside of App.js our ShopPage is being nested in a Route
//     //and Route automatically passes those 3 objects(match,location,history) into our component as props
//     <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// );

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null; //method- a snapshot representation of our collections array we get from firestore;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        collectionRef.onSnapshot(snapShot => { //whenever the collectionRef updates or this code runs for the first time, 
            //this collectionRef will send us the snapshot representing the code of the collections objects array at the time when this code renders
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
        });
    };

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);