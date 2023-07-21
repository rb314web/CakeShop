import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import "./contact.scss";

const Contact = () => {
  const form = useRef<any>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (
      form.current?.[0].value != "" &&
      form.current?.[1].value != "" &&
      form.current?.[2].value != "" &&
      form.current?.[3].value != ""
    ) {
      emailjs
        .sendForm(
          "service_2lxtghg",
          "template_96un6im",
          form.current!,
          "uoa8cmJT5xHCmLk4H"
        )
        .then(
          (result) => {
            console.log("show the user a success message");
          },
          (error) => {
            console.log("show the user an error");
          }
        );
      console.log(form.current);
      form.current[0].value = "";
      form.current[1].value = "";
      form.current[2].value = "";
      form.current[3].value = "";
    } else {
      document.querySelector<HTMLElement>(
        ".contact_form_error"
      )!.style.display = "block";
      console.log("ters55");
    }
  };

  return (
    <div className="contact">
      <form ref={form} className="contact_form" onSubmit={sendEmail}>
        <h2>Kontakt</h2>
        <label>Imie:</label>
        <input type="text" name="user_name" />

        <label>Nazwisko:</label>
        <input type="text" name="user_lastname" />

        <label htmlFor="email">Email:</label>
        <input type="email" name="user_email" />

        <label htmlFor="message">Wiadomość:</label>
        <textarea name="user_message" />

        <button type="submit">Wyślij</button>
        <span className="contact_form_error">Wypełnij wszystkie pola!</span>
      </form>
      <div className="contact_photo"></div>
    </div>
  );
};

export default Contact;