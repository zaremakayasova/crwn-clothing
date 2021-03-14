import { ShopActionTypes } from "./shop.types";

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
};


const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
                //once our api successful we are gonna now update our collections(with action.payload)
                //also going to tell our reducer that it is no longer fetching(false)
            };
            case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
                return {
                    ...state,
                    isFetching: false,
                    errorMessage: action.payload
                };
        default:
            return state;
    }
};

export default shopReducer;