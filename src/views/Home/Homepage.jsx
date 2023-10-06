import * as React from 'react';
import { Button } from 'reactstrap';
import './Home.css'

export const HomePage = () => {
    return (
        <div className="main">
            <div className='home-content'>
                <h2> Welcome to the DORA Software </h2>
                <p> Please enter the global information to start. </p>
                <Button color="primary" onClick={() => { window.location.href = "/admin/global" }}>Global Information</Button>
            </div>
        </div>
    );
}