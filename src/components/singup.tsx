import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { UserContext } from './context';

import './singup.scss';

const Signup = () => {
	const navigate = useNavigate();

	const [userContext, setUserContext] = useContext<any>(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUserContext(user);
				console.log(user);
				navigate('/login');
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ..
			});

		const auth1: any = getAuth();

		sendEmailVerification(auth1.currentUser);

		updateProfile(auth.currentUser!, {
			displayName: name,
		});
	};

	return (
		<div className='signup'>
		<div className='signup_section'>
		<h1> Zarejestruj się! </h1>
			<form className='signup_section_form'>
				<div className='signup_section_form_item'>
					<label htmlFor='name'>Imie</label>
					<input
						type='name'
						aria-label='Create name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className='signup_section_form_item'>
					<label htmlFor='email-address'>Email:</label>
					<input
						type='email'
						aria-label='Email address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='signup_section_form_item'>
					<label htmlFor='password'>Hasło:</label>
					<input
						type='password'
						aria-label='Create password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button type='submit' onClick={onSubmit}>
					Zarejestruj
				</button>
			</form>

			<p>
				Posiadasz już konto? <NavLink to='/login'>Zaloguj się!</NavLink>
			</p>
		</div>
		</div>
	);
};

export default Signup;
