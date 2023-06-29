import React from 'react';

import './contact.scss'

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;