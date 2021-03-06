import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from "./user.actions";

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData); // or createUserProfileDocument(userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
    //put() puts things back into regular Redux flow;
    catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider); //we destructure user from userAuth
        yield getSnapshotFromUserAuth(user);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithEmail({ payload: { email, password } }) { //payload we get from listening to UserActionTypes.EMAIL_SIGN_IN_START 
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* emailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    }
    catch (error) {
        yield put(signOutFailure(error));
    }
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword( //creates a new user account and user assigns to our application from authentication
            //it gives us back userAuth object
            //userAuth is on the key/property user, that why we distructured
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
};

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
};

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
};

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(emailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
};