import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonationCard from './DonationCard';
import Layout from '../components/Layout/Layout';
import '../customCSS/donationpage.css';
import org1 from './org1.png';
import org2 from './org2.jpg';
import org3 from './org3.png';


const DonationList = () => {
   
  const descriptionMap = {
    1: "Assunnah Foundation, established in 2014, aims to promote education, healthcare, and poverty alleviation in underserved communities. Its primary goal is to empower individuals through sustainable programs and charitable initiatives rooted in compassion and service. The foundation actively engages in projects like orphan care, free medical camps, and skill development training.",
    2: "The Bangladesh Army Relief Fund was established to provide immediate support and assistance during natural disasters and crises. Its goal is to aid affected communities through coordinated relief efforts and rehabilitation programs. The fund focuses on delivering essential supplies, medical aid, and rebuilding support to promote recovery and resilience.",
    3: "The Bangladesh Red Crescent Society, established in 1973, works to alleviate human suffering and promote disaster preparedness. Its goal is to provide humanitarian aid, disaster response, and community health services across the country. The organization supports vulnerable populations through emergency relief, blood donation services, and resilience-building initiatives.",
  };

  const imageMap = {
    1: org1,
    2: org2,
    3: org3,
  };
  
  

  const [donationData, setDonationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donation stats from the backend
    const fetchDonationStats = async () => {
      try {
        const response = await fetch('/donations/donation-stats');
        const data = await response.json();
        setDonationData(data);
      } catch (error) {
        console.error('Error fetching donation stats:', error);
      }
    };

    fetchDonationStats();
  }, []);

  const handleDonate = (orgId) => {
    navigate(`/donate/${orgId}`);
  };

  return (
    <Layout>
      <div>
        <div className="donationpage">
          <h1>Join Us in Our Mission</h1>
          <div className="donationpage-content">
            <p>
              We believe in the power of community and the impact of collective action. Your
              donation is not just a contribution; it’s a commitment to making a difference. With
              your help, we can continue to provide essential services, improve our disaster
              response systems, and save lives. Join us in our mission to build a resilient future
              for those affected by floods...
            </p>
          </div>
          {donationData.map((data, index) => (
  <DonationCard
    key={data._id}
    image={imageMap[data._id]} // Use the imported images
    description={descriptionMap[data._id] || "Default description for this organization."}
    totalDonation={data.totalDonation}
    donators={data.donators}
    onDonate={() => handleDonate(data._id)}
    isImageLeft={index % 2 === 0}
  />
))}

        </div>
      </div>
    </Layout>
  );
};

export default DonationList;
