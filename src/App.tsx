import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './App.css';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Routes, Route } from 'react-router-dom';
import { auth } from './utils/firebase';

import Navigation from './components/navigation';
import Header from './components/header';
import Products from './components/products';
import About from './components/about';
import Footer from './components/footer';
import Offer from './components/offer';
import { Basket123 } from './components/basket';
import Login from './components/login';
import Signup from './components/singup';
import { signOut } from 'firebase/auth';
import Contact from './components/contact';

import { UserContext, Context } from './components/context';

import cookies from './components/cookies';

function App() {
	const [context, setContext] = useState<any>([]);
	const [userContext, setUserContext] = useState<any>(UserContext);

	useEffect(() => {
		if (!!cookies.get('cont')) {
			setContext(cookies.get('cont'));
			console.log(cookies.get('cont'), 'sssss');
		}
	}, []);
	useEffect(() => {
		// console.log(userContext.providerData[0]);
	}, [userContext]);

	useEffect(() => {
		cookies.set('cont', context);
	}, [context]);

	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate('/');
				console.log('Signed out successfully');
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<Context.Provider value={[context, setContext]}>
			<UserContext.Provider value={[userContext, setUserContext]}>
				<Navigation />

				<Content />

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
					<Route path='/' element={<><Header /><About/></>} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/products' element={<Products />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
				<Basket123 />

<Footer />
	  </div>
	);
  }

export default App;
