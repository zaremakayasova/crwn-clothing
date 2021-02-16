import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ({ //user= userAuth or user snapshot
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});