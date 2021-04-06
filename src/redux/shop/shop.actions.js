import { ShopActionTypes } from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
    //does not take any payload, it just switches isFetching state to true in reducer
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    //actual function that we pass into our component to begin this process
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
};

// ACTION -> MIDDLEWARE(REDUX-THUNK) -> ROOT REDUCER -> STORE -> DOM CHANGES
//So redux-thunk gives us dispatch, so we can go back to giving synchronous action objects to the root reducer

//thunk is a piece of middleware that allows us to fire functions
//thunk- action creator that returns a function that gets the dispatch; very similar to mapDispatchToProps
//so we write a function that returns a function that gets dispatch in it
//whenever dispatch is called it will fire multiple actions

//redux-thunk does not care about action-objects, instead it only catches what returns a function(ex. fetchCollectionsStartAsync)
//when the redux-thunk sees the function, it provides it with dispatch functionality as a parameter. Thats it!

//MIDDLEWARES CATCHES ACTION BEFORE IT HITS THE REDUCER OR THROW THE ACTION AWAY SO IT NEVER HITS THE REDUCER

//THUNK explanation lecture 192- 4 min







