import * as React from 'react';
import { Button } from 'reactstrap';

export const HomePage = () => {
    return (
        <div className="justify-content-center">
            <h2> Welcome to the DORA Software </h2>
            <p> This is the DORA software. </p>
            <p> Please enter the global information to start. </p>
            <Button color="primary" onClick={() => {window.location.href = "/global"}}>Global Information</Button>
        </div>
    );
}