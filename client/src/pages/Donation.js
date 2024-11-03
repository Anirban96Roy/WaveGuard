import React, { useState } from 'react';
import axios from 'axios';
import '../customCSS/donation.css';

const Donation = () => {
    const [amount, setAmount] = useState('');

    const handleDonate = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Send POST request to the backend
            const response = await axios.post('/api/v1/donate', { amount });
            console.log('Response from backend:', response.data); // Log the response

            // Check if the response contains the payment URL
            if (response.data.GatewayPageURL) {
                // Redirect to the SSLCommerz payment page
                window.location.href = response.data.GatewayPageURL;
            } else {
                console.error('Payment URL not received');
            }
        } catch (error) {
            console.error('Payment initialization failed', error);
        }
    };

    return (
        <div className="donation-container">
            <div className="donation-info">
                <h2>Why You Donate</h2>
                <p>Your donation helps us to achieve our mission...</p>
                <p>We appreciate every contribution that helps us continue our work and make a difference.</p>
            </div>
            <div className="donation-form">
                <form onSubmit={handleDonate}>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    {/* Button with onClick handler */}
                    <button type="submit" onClick={handleDonate}>Donate Now</button>
                </form>
            </div>
        </div>
    );
};

export default Donation;
