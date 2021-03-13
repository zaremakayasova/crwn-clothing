import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//     ) : (
//         <WrappedComponent {...otherProps} />
//     )
// }

const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        )
    }
    return Spinner;
}

export default WithSpinner;

//we are making new WithSpinner HOC- a function that takes some component that
//we want to wrap with the functionality of spinnerloader feature
//and that WrappedComponent gets passed into this new component that wraps around it(WithSpinner)