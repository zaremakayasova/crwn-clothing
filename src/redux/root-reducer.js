//object that represents all of the state of our application
//code that combines all of our states together

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // we got our actual local storage object on window browser
//this is telling redux-persist that we want to use local storage as our default storage

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
    key: "root", //at what point inside of our reducer obj do we wanna storing everything
    storage,
    whitelist: ["cart"] //the only reducer we want to persist, since user reducer is handled by firebase
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);