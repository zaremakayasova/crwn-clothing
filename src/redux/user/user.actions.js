export const setCurrentUser = user => ({ //user= userAuth or user snapshot
    type: 'SET_CURRENT_USER',
    payload: user
  });