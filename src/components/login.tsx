import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

import { UserContext } from './context';

import './login.scss';

const Login = () => {
	const navigate = useNavigate();
	const [userContext, setUserContext] = useContext<any>(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = (e: any) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate('/');
				setUserContext(user);
				localStorage.setItem('my-test-app-currentUser', JSON.stringify(user));
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('Błędny login lub hasło');
				document.querySelector<HTMLElement>('.login_section_form_error')!.style.display = 'block'

			});
	};

	return (
		<div className='login'>
			<div className='login_section'>
				<h1> Logowanie </h1>

				<form className='login_section_form'>
					<div className='login_section_form_item'>
						<label htmlFor='email-address'>Email:</label>
						<input
							id='email-address'
							name='email'
							type='email'
							required
							placeholder='Email address'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className='login_section_form_item'>
						<label htmlFor='password'>Hasło:</label>
						<input
							id='password'
							name='password'
							type='password'
							required
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<span className='login_section_form_error'>Błędny login lub hasło!</span>

					<div className='login_section_form_item'>
						<button onClick={onLogin}>Zaloguj się</button>
					</div>
				</form>

				<p className='text-sm text-white text-center'>
					Nie masz konta? <NavLink to='/signup'>Zarejestruj się!</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Login;
