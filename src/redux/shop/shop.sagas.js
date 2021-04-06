import { takeLatest, call, put, all } from "redux-saga/effects";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

import { ShopActionTypes } from "./shop.types";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection("collections");
        const snapShot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
        //call - sage effect that invokes functions; takes as a first argum a function or a method and the second argum-param that we pass into the first function
        yield put(fetchCollectionsSuccess(collectionsMap));
        //put- saga effect for creating actions, like dispatch but we have to yield it
        //it dispatched object with type and payload
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
};

export function* fetchCollectionsStart() {
    //takeEvery creates non blocking code, so actions can run concurrently(at the same time; it does not pause the JS)
    //take - taking action from the regular redux flow
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
    //second argument is another generator function that will run in response to this takeEvery listener
};

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]) 
};
