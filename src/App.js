import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
//we want to store the state of our user in our app, so then the user logs in
//whether google sign in or email and password, we want to store that state on the app state
//so we can pass it into components that need it, because we want to access our current user object through our app
//so we convert our App to a class component
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //whenever somebody signs in/signs out, we want to be aware when authentic state has changed without having to manually fetch
    //firebase gives us a method for this, that takes the function, where the parameter is what the user state is
    //whenever we sign-in or sign-out this onAuthStateChanged will be called as it is listening for such events.
    //Calling auth.onAuthStateChanged(...) returns another method firebase.unsubscribe() which if we call would close the channel or unsubscribe. 
    //so when unsubscribeFromAuth() is called inside the componentWillUnmount,
    //it now has the value of firebase.unsubscribe(), which executes, closing the session.
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //this function returns userRef;

        userRef.onSnapshot(snapShot => {
          // checks if snapshot has changed/listens for any changes of data/ returns snapshot
          //but also gets back the fist state of that data
          setCurrentUser({ //whenever our user snapshot updates, we are setting the userReducer value with the new object
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });

      } else {
        setCurrentUser(userAuth); //if the user signs out we set currentUser:null
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({ //so we have access to this.props.currentUser
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App); 

//Connect()- a higher-order function that returns a higher-order component.
//Connect is called with the arguments you pass in. There are essentially two steps since it's a curried function and must be called twice.
//The first function call takes the arguments you passed in and returns a higher-order component (a function that takes in a component and returns another):
//Next, we are 'wrapping' the App component, providing it with all the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
//So, the 2nd call returns a new "connected"/container App component that is connected to the Redux store with all the props/actions injected into it. And that is what gets exported.
