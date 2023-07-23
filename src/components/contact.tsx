import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import "./contact.scss";

const Contact = () => {
  const form = useRef<any>(null);

  let flag = false;

  const validationForm = () => {
    let err = 0
    document
      .querySelectorAll<HTMLInputElement>(".input_validation")
      .forEach((e) => {
        console.log(e);

        if (!e.value && flag) {
          e.style.border = "1px solid red";
          err =+ 1
        } else e.style.border = "1px solid #cfcfcf";
      });

      return err ? false : true
  };

  const sendEmail = (e: any) => {
    e.preventDefault();
    flag = true;
    validationForm();

    if (validationForm()) {
      emailjs
        .sendForm(
          "service_2lxtghg",
          "template_96un6im",
          form.current!,
          "uoa8cmJT5xHCmLk4H"
        )
        .then(
          (result) => {
            const mess = document.createElement("p")
            const textnode = document.createTextNode("Wiadomość wysłana poprawnie!");
            mess.appendChild(textnode);
            mess.classList.add('message-successful');
            document.querySelector('button')?.after(mess)
          },
          (error) => {
            const mess = document.createElement("p")
            const textnode = document.createTextNode("Błąd wysyłania wiadomości!");
            mess.appendChild(textnode);
            mess.classList.add('message-error');
            document.querySelector('button')?.after(mess)
          }
        );
      form.current[0].value = "";
      form.current[1].value = "";
      form.current[2].value = "";
      form.current[3].value = "";
    }
  };

  return (
    <div className="contact">
      <form
        onChange={validationForm}
        ref={form}
        className="contact_form"
        onSubmit={sendEmail}
      >
        <div className="contact_form_wrapper">
          <h2>Kontakt</h2>
          <label>Imie:</label>
          <input
            className="input_validation"
            type="text"
            name="user_name"
            placeholder="Wpisz swoje imię"
          />

          <label>Nazwisko:</label>
          <input
            className="input_validation"
            type="text"
            name="user_lastname"
            placeholder="Wpisz swoje nazwisko"
          />

          <label htmlFor="email">Email:</label>
          <input
            className="input_validation"
            type="email"
            name="user_email"
            placeholder="Wpisz swój email"
          />

          <label htmlFor="message">Wiadomość:</label>
          <textarea className="input_validation" name="user_message" />

          <button type="submit">Wyślij</button>
        </div>
      </form>
      <div className="contact_photo"></div>
    </div>
  );
};

export default Contact;
