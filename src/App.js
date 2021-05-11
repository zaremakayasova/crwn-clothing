import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { GlobalStyle } from './global.styles';

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { checkUserSession } from "./redux/user/user.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"));
const ContactPage = lazy(() => import("./pages/contact/contact.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); // we pass an empty erray if we want to run it only once when it mounts, on initialization
  // if we pass array with value(like checkUserSession), it means that we want useEffect gets called when these values changes
  // if we want useEffect be called everytime our component gets called or rerenders, we dont pass anything as the second parameter, we pass no array

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        {/* Suspense= component that allows to wrap any part of the application that might be rendering async components; meant to be used with react lazy */}
        {/* It renders fallback div and waits until actual components is being finished lazy loaded(HomePage) */}
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
            <Route exact path="/contact" component={ContactPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({ //so we have access to this.props.currentUser
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,
  mapDispatchToProps)(App);

//Connect()- a higher-order function that returns a higher-order component.
//Connect is called with the arguments you pass in. There are essentially two steps since it's a curried function and must be called twice.
//The first function call takes the arguments you passed in and returns a higher-order component (a function that takes in a component and returns another):
//Next, we are "wrapping" the App component, providing it with all the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
//So, the 2nd call returns a new "connected"/container App component that is connected to the Redux store with all the props/actions injected into it. And that is what gets exported.



