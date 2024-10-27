import React from 'react'
import Layout from '../components/Layout/Layout'
import '../customCSS/homepage.css';
import v from '../components/v.mp4';
const HomePage = () => {
  return (
    <Layout>
            <div className="content">
                <video autoPlay loop muted playsInline className="bgvideo">
                    <source src={v} type="video/mp4" />
                </video>
                <div className="overlay"></div> {/* Dark overlay on video */}
                <h1>Flood Management & Monitoring System</h1>
                <p>
                    Welcome to our Flood Management & Monitoring System, designed to provide real-time data and resources to help communities prepare for and respond to flooding events.<br />
                    Our platform utilizes advanced technology to track weather patterns, monitor water levels, and provide timely alerts.<br />
                    We aim to enhance safety and resilience by empowering individuals and organizations with the information they need to mitigate the impact of floods. Join us in our mission to create safer, more prepared communities!
                </p>
                <div className="buttonx">
                    <button type="button">
                        Need Help?
                        <span><span></span> </span> {/* This span is for the hover effect */}
                    </button>
                    <span><span><span></span></span></span>
                    <button type="button">
                        Wanna Be a Volunteer?
                        <span></span> {/* This span is for the hover effect */}
                    </button>
                </div>

                <div className="Information">
                    <div className="Information-row">
                        <div className="Information-card">
                        <h3>Information Card</h3>
                        <p>Lorem ipsum dolor sit amet,  consectetur adipiscing elit</p>
                        <a>Learn more</a> 
                        </div>
                        <div className="Information-card">
                        <h3>Information Card</h3>
                        <p>Lorem ipsum dolor sit amet,  consectetur adipiscing elit</p>
                        <a>Learn more</a> 
                        </div>
                        <div className="Information-card">
                        <h3>Information Card</h3>
                        <p>Lorem ipsum dolor sit amet,  consectetur adipiscing elit</p>
                        <a>Learn more</a>     
                        </div>
                    </div>
                </div>

                   

            </div>
        </Layout>
  )
}

export default HomePage