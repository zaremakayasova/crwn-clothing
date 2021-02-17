//utility functions allow us to keep our files clean and
//organize functions that we may need in multiple files in one lcoation

export const addItemToCart = (cartItems, cartItemToAdd) => {//cartItems-existing items, cartItemToAdd- items that we want to add
    const existingCartItem = cartItems.find(cartItem => //we get the fist item of the array based off the condition we pass in 
        cartItem.id === cartItemToAdd.id); //if its true, it will set the cartItem where this condition is true to existingCartItem, if it doenst=undefined

    if (existingCartItem) {
        return cartItems.map(cartItem =>  //map. because we need to return a new array=new version of our state, so our component rerenders
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    //if cartItem is not found inside our array
    return [...cartItems, { ...cartItemToAdd, quantity: 1}];
};
