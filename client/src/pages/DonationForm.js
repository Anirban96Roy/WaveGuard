import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../customCSS/donationForm.css'; // Import the CSS file
import Layout from '../components/Layout/Layout';

const DonationForm = () => {
  const { orgId } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/donations', { ...formData, orgId });
      await axios.post('/users/automate-donation', { ...formData, orgId });
      alert('Donation processed successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  };

  return (
    <Layout>
    <div className="donation-container">
      <div className="donation-info">
        <h2>Make a Difference</h2>
        <p>
          Your generosity helps us provide essential services, improve disaster response systems,
          and save lives. Every contribution makes an impact. Join us in building a resilient
          future for those affected by floods.
        </p>
      </div>
      <form className="donate-form" onSubmit={handleSubmit}>
        <div>
          <label>Your Name (In English)</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Donation Amount (In English)</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter donation amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
    </Layout>
  );
};

export default DonationForm;
