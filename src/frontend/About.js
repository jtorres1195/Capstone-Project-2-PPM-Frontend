import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className='about-container'>
            <h1 className='about-header'>About Us</h1>
            <p className='about-description'>
                The purpose of this site is to help people find the perfect pet to suit their lifestyle.
                This site draws its data from the PetFinder API to get the list of pets that are available 
                for adoption, and it is built through React and Node.js. All of the pets come from various shelters and adoption
                organizations that are dedicated to helping pets find their forever home. This site's intention is to act as the middle man to connect you with
                those organizaitons to help you find the pet you're looking for. There are so many opportunities to find your potential friend for life, so I hope you enjoy your experience
                using this website to help you find what you are looking for!
            </p>
        </div>
    )
}

export default About;