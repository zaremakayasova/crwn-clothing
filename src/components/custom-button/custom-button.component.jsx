import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

// const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
//     <button className={
//         `${isGoogleSignIn ? "google-sign-in" : ""} 
//         ${inverted ? "inverted" : ""} 
//         custom-button`}
//         {...otherProps}
//     >
//         {children}
//     </button>
// )

const CustomButton = ({ children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;

