import React from 'react';

import {
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        //  lifecycle method that catches any errors that gets thrown in any of the children of this component
        // process the error
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        // lifecycle method that gives us access to both the error and the info related to the error and how it got thrown(which component etc.)
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) { //if it is true
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/g3hgqe8.png" />
                    <ErrorImageText>Sorry, this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;