import React from "react";

import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; //stripe needs the price to be in cents
    const publishableKey = "pk_test_51IPXGKJJt2K9GGe404JRfkAk0WbziSW6dP111BYKpws9wt6RvZETfRFbDtZeyqz6lvXm78OuYOQArje0sPqWDRei00nlnMhdVl"

    const onToken = (token) => {
        console.log(token);
        alert("Payment Successfull")
    }

    return (
        <StripeCheckout
            label="Pay now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $$ ${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;