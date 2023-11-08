import React, { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';

const Login = ({ setIsAuthenticated }) => {
	const adminEmail = 'admin@vehiclevista.com';
	const adminPassword = 'qwerty';
	const [email, setEmail] = useState(adminEmail);
	const [password, setPassword] = useState(adminPassword);

	const handleLogin = e => {
		e.preventDefault();
		if (email === adminEmail && password === adminPassword) {
			Swal.fire({
				timer: 1500,
				showConfirmButton: false,
				willOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					localStorage.setItem('is_authenticated', true);
					setIsAuthenticated(true);
					Swal.fire({
						icon: 'success',
						title: 'Successfully logged in!',
						showConfirmButton: false,
						timer: 1500,
					});
				},
			});
		} else {
			Swal.fire({
				timer: 1500,
				showConfirmButton: false,
				willOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					Swal.fire({
						icon: 'error',
						title: 'Error!',
						text: 'Incorrect email or password.',
						showConfirmButton: true,
					});
				},
			});
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-gradient-to-b from-blue-950 to-red-600'>
			<div className='w-full max-w-xs'>
				<div className='text-center mb-8'>
					<h1 className='mt-2 text-2xl font-bold text-white'>
						Welcome to Vehicle Vista
					</h1>
					<img
						src={logo}
						alt='Vehicle Vista Logo'
						className='mx-auto mt-4 max-w-80vw h-auto'
					/>
				</div>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8'
					onSubmit={handleLogin}>
					<h2 className='text-2xl text-center font-bold mb-6'>Admin Login</h2>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='email'>
							Email
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							type='email'
							name='email'
							placeholder='admin@example.com'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'>
							Password
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							name='password'
							placeholder='qwerty'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='flex items-center justify-center'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
							value='Login'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
