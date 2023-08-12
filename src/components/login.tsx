import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  getAuth,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "./context";

import "./login.scss";
import GoogleImg from "../assets/btn_google_signin_light_normal_web.png";

const Login = () => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext<any>(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result: any) => {
        console.log('result.user', auth.currentUser )


        if (result.user || auth.currentUser) {
          setIsLoading(false)}

        navigate("/");
        const user = result.user;
        setUserContext(user);
        localStorage.setItem("userContext", JSON.stringify(user));
      })
      .catch((error) => {

        console.log(error)
      });
  }, []);

  const handleClick = () => {
    signInWithRedirect(auth, provider).then(
      () => navigate("/")
    )
  };

  const onLogin = async (e: any) => {
    e.preventDefault();

    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        navigate("/");
        setUserContext(user);
        localStorage.setItem("userContext", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Błędny login lub hasło");
        document.querySelector<HTMLElement>(
          ".login_section_form_error"
        )!.style.display = "block";
      });
  };

  return (
    <>
    {!isLoading && (
          <div className="login">
          <div className="login_section">
            <h1> Logowanie </h1>
            <img onClick={handleClick} src={GoogleImg}></img>
            <form className="login_section_form">
              <label htmlFor="email-address">Email:</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Adres email"
                onChange={(e) => setEmail(e.target.value)}
              />
    
              <label htmlFor="password">Hasło:</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="login_section_form_error">
                Błędny login lub hasło!
              </span>
    
              <div className="login_section_form_button">
                <button onClick={onLogin}>Zaloguj się</button>
              </div>
            </form>
    
            <p className="text-sm text-white text-center">
              Nie masz konta? <NavLink to="/signup">Zarejestruj się!</NavLink>
            </p>
          </div>
    
          <div className="login_photo"></div>
        </div>
    )}

    {isLoading && (
      <p>Ładownie...</p>
    )}
    </>
  );
};

export default Login;
