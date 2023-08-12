import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./App.css";

import { Routes, Route } from "react-router-dom";
import { auth } from "./utils/firebase";

import Navigation from "./components/navigation";
import Header from "./components/header";
import Products from "./components/products";
import About from "./components/about";
import Footer from "./components/footer";
import Offer from "./components/offer";
import { Basket123 } from "./components/basket";
import Login from "./components/login";
import Signup from "./components/singup";
import { signOut } from "firebase/auth";
import Contact from "./components/contact";
import UserSettings from "./components/usersettings";
import Order from "./components/order";
import AdminPanel from "./components/adminpanel";

import { UserContext, Context } from "./components/context";

import cookies from "./components/cookies";

function App() {
  const [context, setContext] = useState<any>([]);
  const [userContext, setUserContext] = useState<any>(UserContext);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    document.querySelectorAll(".navigation_item a").forEach((e) => {
      e.addEventListener("click", () => {
        document
          .querySelector(".navigation_item")
          ?.classList.remove("navigation_item_active");
        console.log("aaaaaaaaaaaa");
      });
    });
  }, []);

  useEffect(() => {
    const www = localStorage.getItem("userContext");

    if (!!www) setUserContext(JSON.parse(www!));

    if (!!cookies.get("cont")) {
      setContext(cookies.get("cont"));
      console.log(cookies.get("cont"), "rrrr");
    }
  }, []);
  useEffect(() => {
    // console.log(userContext.providerData[0]);
  }, [userContext]);

  useEffect(() => {
    cookies.set("cont", context);
    console.log(cookies.get("cont"), "teraz");
  }, [context]);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Context.Provider value={[context, setContext]}>
      <UserContext.Provider value={[userContext, setUserContext]}>
        <div className="App">
          <Navigation />
          <Content />
          <Basket123 />
        </div>
      </UserContext.Provider>
    </Context.Provider>
  );
}

function Content() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
