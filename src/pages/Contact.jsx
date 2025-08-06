import React from 'react';
import ContactForm from './ContactForm';
import Navbar from '../components/Navbar';
import './Contact.css';

const Contact = () => {
  return (
    <div className='contact-container'>
      <Navbar />
      <ContactForm />
    </div>
  );
};

export default Contact;
