import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const [donation, setDonation] = useState(null);

    useEffect(() => {
        const fetchDonationDetails = async () => {
            // You can retrieve the transaction ID from the URL or state
            const { tran_id } = location.state || {}; // Assuming you set this in your payment success redirection
            if (tran_id) {
                const response = await fetch(`http://localhost:8000/api/v1/donate/success/${tran_id}`, {
                    method: 'POST',
                });
                const data = await response.json();
                if (response.ok) {
                    setDonation(data.donation);
                } else {
                    console.error(data.message);
                }
            }
        };

        fetchDonationDetails();
    }, [location]);

    return (
        <div>
            <h1>Thank You for Your Donation!</h1>
            {donation ? (
                <div>
                    <p>Your transaction was successful. Here are your donation details:</p>
                    <p>Name: {donation.name}</p>
                    <p>Email: {donation.email}</p>
                    <p>Amount: {donation.amount} BDT</p>
                    <p>Status: {donation.status}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Success;
