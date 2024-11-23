import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {


    return (
        <div>
            <h1>Thank You for Your Donation!</h1>
           
                <div>
                    <p>Your transaction was successful. Here are your donation details:</p>
                </div>
            
                <p>Loading...</p>
           
        </div>
    );
};

export default Success;