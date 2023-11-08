import React from 'react';
import Logout from '../Logout/Logout';

const Header = ({ setIsAdding, setIsAuthenticated, resetData }) => {
	return (
		<header className='bg-gray-900 text-white py-4 px-6 w-full'>
			<h1 className='text-2xl font-bold'>Vehicle Management Software</h1>
			<div className='mt-6 mb-4'>
				<button
					onClick={resetData}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline'>
					Reset
				</button>
				<button
					onClick={() => setIsAdding(true)}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline'>
					Add Vehicle
				</button>
				<Logout setIsAuthenticated={setIsAuthenticated} />
			</div>
		</header>
	);
};

export default Header;
