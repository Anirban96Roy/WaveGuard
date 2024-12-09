import React from 'react';
import '../customCSS/donationcard.css';
const DonationCard = ({ image, description, totalDonation, donators, onDonate, isImageLeft }) => {
  return (
    <div className="donor-card">
      {/* Organization image */}
      <img src={image} alt="Organization Logo" className="donor-card-image" />
       
      {/* Content area */}
      <div className="donor-card-content">
        <p className="donor-card-description">{description}</p>
        <p className="donor-card-stats">Total Donations: ${totalDonation}</p>
        <p className="donor-card-stats">Donators: {donators}</p>
        <button className="donor-button" onClick={onDonate}><p>Donate</p></button>
      </div>
    </div>
  );
};

export default DonationCard;
