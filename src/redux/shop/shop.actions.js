import { ShopActionType } from "./shop.types";

export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});