// Updated DonationCard.js
import React from 'react';
import '../customCSS/donationcard.css';

const DonationCard = ({ image, description, totalDonation, donators, onDonate, isImageLeft }) => {
  return (
    <div className="donor-card-container">
      <div className="image-card">
        <img src={image} alt="Organization Logo" className="donor-card-image" />
      </div>
      
      <div className="content-card">
        <p className="donor-card-description">{description}</p>
        <p className="donor-card-stats">Total Donations: BDT {totalDonation}</p>
        <p className="donor-card-stats">Donors: {donators}</p>
        <button className="donor-button" onClick={onDonate}>
          <p>Donate</p>
        </button>
      </div>
    </div>
  );
};

export default DonationCard;