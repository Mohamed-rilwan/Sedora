import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
        console.log('initiated');
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        console.log('ERROR');
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        console.log('STATE');
        console.log(this.state.error);
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h4>Sorry cant show Frequency Results before entering the global inforamtion.</h4>
                    <Button color="primary" onClick={() => {window.location.href = "/"}}>Reload</Button>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;