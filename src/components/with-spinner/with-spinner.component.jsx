import React from "react";

import Spinner from "../spinner/spinner.component";

// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//     ) : (
//         <WrappedComponent {...otherProps} />
//     )
// }

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <Spinner />
        ) : (
            <WrappedComponent {...otherProps} />
        )
};

export default WithSpinner;

//we are making new WithSpinner HOC- a function that takes some component that
//we want to wrap with the functionality of spinnerloader feature
//and that WrappedComponent gets passed into this new component that wraps around it(WithSpinner)