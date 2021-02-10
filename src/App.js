import React from "react";
import { Route, Switch } from "react-router-dom";

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
//we want to store the state of our user in our app, so then the user logs in
//whether google sign in or email and password, we want to store that state on the app state
//so we can pass it into components that need it, because we want to access our current user object through our app
//so we convert our App to a class component


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //whenever somebody signs in/signs out, we want to be aware when authentic state has changed
    //without having to manually fetch
    //firebase gives us a method for this, that take the function, where the parameter is what the user state is
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user }) //user is a parameter that is a state.//the last user that was sign in without sign out
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //this function returns userRef;

        userRef.onSnapshot(snapShot => {
          //onSnapShot is similar to onAuthStateChanged
          //check if snapshot has changed, returns snapshot/ listen for any changes of data
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth }); //currentUser:null
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //this will close the subscription
  }

  //unsubscribeFromAuth is initialised as null
  //unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged().
  // this method returns another method: firebase.unsubscribe().
  //so when unsubscribeFromAuth() is called inside the componentWillUnmount,
  // it now has the value of firebase.unsubscribe(), which executes, closing the session.


  render() {

    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }


}

export default App;
