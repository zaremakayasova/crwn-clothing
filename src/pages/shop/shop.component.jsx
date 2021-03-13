import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// const ShopPage= ({ match }) => (
//     //we have access to the match object because inside of App.js our ShopPage is being nested in a Route
//     //and Route automatically passes those 3 objects(match,location,history) into our component as props
//     <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// );

class ShopPage extends React.Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         loading: true
    //     }
    // }

    state = {
        loading: true
    };
    //simplified version, so we do not have to write constructor, super.
    //react will know if you are in class component and you write a state property like so,
    //that you are probably invoking a state
    //so under the hood it will invoke the super for us, so we can leverage the state value

    unsubscribeFromSnapshot = null; //method- a snapshot representation of our collections array we get from firestore;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");

        //     collectionRef.onSnapshot(snapShot => { //whenever the collectionRef updates or this code runs for the first time, 
        //         //this collectionRef will send us the snapshot representing the code of the collections objects array at the time when this code renders
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //         updateCollections(collectionsMap);
        //         this.setState({ loading: false });
        //     });
        // }


        //PROMISE PATTERN - the only time we get new data from our backend is when we remount our shop;
                            //onSnapShot gave us the live update

        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });


        //WITH FETCH API- this pattern is very nested-unnecessary amount of work right now

        // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-a79ea/databases/(default)/documents/collections")
        // .then(response => response.json())
        // .then(collections => console.log(collections))
    }


        render() {
            const { match } = this.props;
            const { loading } = this.state;
            return (
                <div className="shop-page">
                    <Route
                        exact path={`${match.path}`}
                        render={(props) =>
                            <CollectionOverviewWithSpinner isLoading={loading} {...props} />}
                    />
                    {/* we pass props(match, location, history), so we can access them in CollectionPage */}
                    <Route
                        path={`${match.path}/:collectionId`}
                        render={(props) =>
                            <CollectionPageWithSpinner isLoading={loading} {...props} />}
                    />
                </div>
            );
        }
    };

    const mapDispatchToProps = dispatch => ({
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    });

    export default connect(null, mapDispatchToProps)(ShopPage);