import React from "react";

export interface ErrorBoundaryProps {
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: any;
}

export class ErrorBoundary extends React.Component {

    public state: ErrorBoundaryState;

    constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
        super(props)
        
        this.state = { 
            hasError: false
        };
    }

    public static getDerivedStateFromError(error: any): ErrorBoundaryState {
        return { 
            hasError: true,
            error,
        };
    }

    public render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}