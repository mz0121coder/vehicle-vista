import React from 'react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from 'firebase/auth';

const Logout = ({ setIsAuthenticated }) => {
	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				Swal.fire({
					icon: 'question',
					title: 'Logging Out',
					text: 'Are you sure you want to log out?',
					showCancelButton: true,
					confirmButtonText: 'Yes',
				}).then(result => {
					if (result.value) {
						Swal.fire({
							timer: 1500,
							showConfirmButton: false,
							willOpen: () => {
								Swal.showLoading();
							},
							willClose: () => {
								// localStorage.setItem('is_authenticated', false);
								setIsAuthenticated(false);
							},
						});
					}
				});
				// Sign-out successful.
			})
			.catch(error => {
				// An error happened.
			});
	};

	return (
		<button
			className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded shadow'
			onClick={handleLogout}>
			Logout
		</button>
	);
};

export default Logout;
