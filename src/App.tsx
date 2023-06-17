import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/navigation';
import Header from './components/header';
import Products from './components/products';
import About from './components/about';
import Footer from './components/footer';
import Offer from './components/offer';
import {Basket123} from './components/basket'

import { Context } from './components/context';

import cookies from './components/cookies'

function App() {
	const [context, setContext] = useState<any>([]);

	useEffect(() => {
		if (!!cookies.get('cont')) {setContext(cookies.get('cont'))}
	}, []);

	useEffect(() => {
		cookies.set('cont', context);
	},[context])
	return (
		<Context.Provider value={[context, setContext]}>
			<Navigation />
			<Header />
			{/* <Routes>
				<Route index element={<Header />} />
				<Route path='/products' element={<p>dfd123</p>} />
				<Route path='/contacts' element={<p>1fdfdf23</p>} />
			</Routes> */}
			<Products />
			<Basket123/>
			<About />
			<Offer />
			<Footer />
		</Context.Provider>
	);
}

export default App;
