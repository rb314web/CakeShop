import React, { useState, useContext, useEffect } from "react";
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

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        console.log(result.user);
        navigate("/");
        const user = result.user;
        setUserContext(user);
      })
      .catch((error) => {
        console.log(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };

  const onLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        navigate("/");
        setUserContext(user);
        localStorage.setItem("my-test-app-currentUser", JSON.stringify(user));
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
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Hasło:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
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
  );
};

export default Login;
