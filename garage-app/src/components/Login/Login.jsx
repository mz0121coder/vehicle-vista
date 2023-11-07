import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';

const Login = ({ setIsAuthenticated }) => {
	// const adminEmail = 'admin@example.com';
	// const adminPassword = 'qwerty';

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleLogin = async e => {
		e.preventDefault();

		const auth = getAuth();

		try {
			await signInWithEmailAndPassword(auth, email, password);
			Swal.fire({
				timer: 1500,
				showConfirmButton: false,
				willOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					// localStorage.setItem('is_authenticated', true);
					setIsAuthenticated(true);
					Swal.fire({
						icon: 'success',
						title: 'Successfully logged in!',
						showConfirmButton: false,
						timer: 1500,
					});
				},
			});
		} catch (error) {
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

		if (email === adminEmail && password === adminPassword) {
			// Swal.fire({
			// 	timer: 1500,
			// 	showConfirmButton: false,
			// 	willOpen: () => {
			// 		Swal.showLoading();
			// 	},
			// 	willClose: () => {
			// 		localStorage.setItem('is_authenticated', true);
			// 		setIsAuthenticated(true);
			// 		Swal.fire({
			// 			icon: 'success',
			// 			title: 'Successfully logged in!',
			// 			showConfirmButton: false,
			// 			timer: 1500,
			// 		});
			// 	},
			// });
		} else {
			// Swal.fire({
			// 	timer: 1500,
			// 	showConfirmButton: false,
			// 	willOpen: () => {
			// 		Swal.showLoading();
			// 	},
			// 	willClose: () => {
			// 		Swal.fire({
			// 			icon: 'error',
			// 			title: 'Error!',
			// 			text: 'Incorrect email or password.',
			// 			showConfirmButton: true,
			// 		});
			// 	},
			// });
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='w-full max-w-xs'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
					onSubmit={handleLogin}>
					<h1 className='text-2xl text-center font-bold mb-6'>Admin Login</h1>
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
					<div className='flex items-center justify-between'>
						<input
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
							value='Login'
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
