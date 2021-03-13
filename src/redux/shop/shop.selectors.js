import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector( //to convert object to array);
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
    createSelector( //curried function- a function which returns another function; curried function takes one parameter at a time;
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null) //or we can also return collections cus it is also null
    );