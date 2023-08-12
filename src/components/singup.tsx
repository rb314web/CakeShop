import React, { useState, useContext, createElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { auth } from "../utils/firebase";
import { UserContext } from "./context";

import "./singup.scss";

const Signup = () => {
  const navigate = useNavigate();

  const [userContext, setUserContext] = useContext<any>(UserContext);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  let flag = false;

  // Sprawdzenie czy hasło zostało powtórzone poprawnie
  const validationRepeatPassword = () => {

    return password === repeatPassword ? true : false;
  };


  const validatePassword = (password: string) => {
    // Sprawdź długość hasła
    if (password.length < 8) {
      return "Hasło musi mieć co najmniej 8 znaków";
    }
  
    // Sprawdź, czy hasło zawiera dużą literę
    if (!/[A-Z]/.test(password)) {
      return "Hasło musi zawierać dużą literę";
    }
  
    // Sprawdź, czy hasło zawiera małą literę
    if (!/[a-z]/.test(password)) {
      return "Hasło musi zawierać małą literę";
    }
  
    // Sprawdź, czy hasło zawiera cyfrę
    if (!/[0-9]/.test(password)) {
      return "Hasło musi zawierać cyfrę";
    }
  
    // Sprawdź, czy hasło zawiera znak specjalny
    if (!/[!@#$%^&*()_+]/.test(password)) {
      return "Hasło musi zawierać znak specjalny";
    }
  
    // Hasło jest poprawne
    return false;
  };


const errorMessage = (text: string) => {
  const p = document.createElement('p')
  const textnode = document.createTextNode(text);
  p.appendChild(textnode);
  document.querySelector('button')?.after(p)
}




  const validationForm = () => {
    let err = 0;
    const input = document.querySelectorAll<HTMLInputElement>("input");

    input.forEach((e) => {
      if (!e.value && flag) {
        e.style.border = "1px solid red";
        err += 1;
      } else {
        e.style.border = "1px solid #cfcfcf";
      }
    });
    console.log('!e.value',err)

    return !err
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

        const auth1: any = getAuth();


if (!validatePassword(password) && validationForm() && validationRepeatPassword()) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUserContext(user);
          console.log(user);
          navigate("/login");
          sendEmailVerification(auth1.currentUser);
})}



  if (!validatePassword(password)) {
    // errorMessage(validatePassword(password))
  }









    // errorMessage('65867m8rr76m')

    // if (!validatePassword(password)) {
    //   await createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       // Signed in
    //       const user = userCredential.user;
    //       setUserContext(user);
    //       console.log(user);
    //       navigate("/login");
    //       sendEmailVerification(auth1.currentUser);
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       console.log(errorCode, errorMessage);
    //       // ..
    //     });

    //   const auth1: any = getAuth();

    //   //   updateProfile(auth.currentUser!, {
    //   //     displayName: name,
    //   //   });
    //   // } else {
    //   //   console.log("błąd");
    // }

    flag = true;
    validationForm();
  };

  return (
    <div className="signup">
      <div className="signup_section">
        <h1> Zarejestruj się! </h1>
        <form onChange={validationForm} className="signup_section_form">
          <label htmlFor="name">Imie</label>
          <input
            type="name"
            aria-label="Create name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="name">Nazwisko:</label>
          <input
            type="name"
            aria-label="Create name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />

          <label htmlFor="email-address">Email:</label>
          <input
            type="email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            aria-label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="password">Powtórz hasło:</label>
          <input
            type="password"
            aria-label="Create password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          <button type="submit" onClick={onSubmit}>
            Zarejestruj
          </button>
        </form>

        <p>
          Posiadasz już konto? <NavLink to="/login">Zaloguj się!</NavLink>
        </p>
      </div>

      <div className="signup_photo"></div>
    </div>
  );
};

export default Signup;
