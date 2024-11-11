import React, { useState } from 'react';
import axios from 'axios';
import '../customCSS/donation.css';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';

const Donation = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');


    const handleDonate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/donate/init', { amount,name,mail });
            console.log('Response from backend:', response.data);

            if (response.data.GatewayPageURL) {
                window.location.href = response.data.GatewayPageURL;
            } else {
                console.error('Payment URL not received');
            }
        } catch (error) {
            console.error('Payment initialization failed', error);
        }
    };

    return (
        <Layout>
        <div className="donation-container">
            <div className="donation-info">     
                <h2>Join Us in Our Mission</h2>
                <p>We believe in the power of community and the impact of collective action. Your donation is not just a contribution; it’s a commitment to making a difference. With your help, we can continue to provide essential services, improve our disaster response systems, and save lives. Join us in our mission to build a resilient future for those affected by floods....</p>
            </div>
            <div className="donation-form">
                <form onSubmit={handleDonate}>
                    <label htmlFor="dname">Name:</label>

                    <input 
                        type="text" // Change to text type
                        id="dname"
                        name="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state
                        required 
                    />
                     <label htmlFor="dmail">Email:</label>
                        <input 
                                type="text" // Change to text type
                                id="dmail"
                                name="Email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required 
                        />
                    
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <button className="donation-btn" type="submit">Donate Now</button>
                </form>
            </div>
        </div>
       </Layout>
    );
};

export default Donation;
