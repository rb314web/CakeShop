import React, {useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import './contact.scss'

const Contact = () => {

  const form = useRef<any>(null);


    const sendEmail = (e:any) => {
      e.preventDefault(); // prevents the page from reloading when you hit “Send”


      if(form.current?.[0].value != '' && form.current?.[1].value != '' && form.current?.[2].value != '' && form.current?.[3].value != '') {
       
        
        emailjs.sendForm('service_2lxtghg', 'template_96un6im', form.current!, 'uoa8cmJT5xHCmLk4H')
          .then((result) => {
              console.log('show the user a success message')
          }, (error) => {
              console.log('show the user an error')
            });
            console.log(form.current)
            form.current[0].value = ''
          form.current[1].value = ''
          form.current[2].value = ''
          form.current[3].value = ''
          
          
        } else {
          document.querySelector<HTMLElement>('.contact-container_error')!.style.display = 'block'
        console.log('ters55')
      }
   




  }

  return (
    <div className="contact-container">
      <h2>Kontakt</h2>
      <form ref={form} className="contact-form" onSubmit={sendEmail}>
        <label>Imie:</label>
        <input type="text" name='user_name' />

        <label>Nazwisko:</label>
        <input type="text" name='user_lastname' />

        <label htmlFor="email">Email:</label>
        <input type='email' name='user_email' />

        <label htmlFor="message">Wiadomość:</label>
        <textarea name='user_message'/>

        <button type="submit">Wyślij</button>
      </form>
      <span className='contact-container_error'>Wypełnij wszystkie pola!</span>
    </div>
  );
};

export default Contact;