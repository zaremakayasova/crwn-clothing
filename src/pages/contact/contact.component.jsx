import React from "react";

import "./contact.styles.scss";


const ContactPage = () => (
    <div className="contact">
        <h1 className="title">We'd love to hear from you</h1>
        <span className="text-info">Our Customer Service teams are working hard to help you. Please note, we are experiencing longer delivery times due to extra safety precautions being taken at our warehouse. Thank you for your patience.</span>
        <h3 className="categories">Opening Hours</h3>
        <span className="text">Monday - Sunday: 9 am - 11 pm (EST)</span>
        <div className="image-content">
            <img src="https://i.ibb.co/0s3pdnc/adidas-nmd.png" alt="image" />
            <div className="text-between">
                <h3 className="categories">Call Us</h3>
                <span className="text">1-705-937-9907</span>
                <span className="text">For phone support, we are available Monday – Sunday: 9am – 11pm (EST)</span>
                <h3 className="categories">By Message</h3>
                <span className="text">Please feel free to send us a message via Facebook Messenger.</span>
                <h3 className="categories">By Email</h3>
                <span className="text">Feel free to send us an email. We aim to reply within 24 hours.</span>
            </div>
            <img src="https://i.ibb.co/1RcFPk0/white-nike-high-tops.png" alt="image" />
        </div>
        <h3 className="categories">By Social Media</h3>
        <span className="text">Facebook</span>
        <span className="text">Twitter</span>
        <span className="text">Instagram</span>
        <h3 className="categories">Return Address</h3>
        <span className="text">205 Prince Road West, Unit E,</span>
        <span className="text">Toronto, Ontario H0A 2W8</span>
        <h3 className="categories">Mailing Address</h3>
        <span className="text">205 Prince Road West, Unit E,</span>
        <span className="text">Toronto, Ontario H0A 2W8</span>
    </div>
);

export default ContactPage;