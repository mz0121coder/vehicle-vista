import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Table = ({ vehicles, handleEdit, handleDelete }) => {
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const vehiclesPerPage = 10;
	const lastVehicleIndex = currentPage * vehiclesPerPage;
	const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
	const currentVehicles = vehicles.slice(firstVehicleIndex, lastVehicleIndex);

	const handleView = vehicle => {
		setSelectedVehicle(vehicle);
	};

	const handleCloseModal = () => {
		setSelectedVehicle(null);
	};

	const handleNextPage = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	const handlePreviousPage = () => {
		setCurrentPage(prevPage => prevPage - 1);
	};

	return (
		<div>
			<table className='w-full bg-white border border-gray-300'>
				<thead>
					<tr className='bg-gray-200'>
						<th className='py-2 px-4 border-b'>Id</th>
						<th className='py-2 px-4 border-b'>Make</th>
						<th className='py-2 px-4 border-b'>Model</th>
						<th className='py-2 px-4 border-b'>Reg.</th>
						<th className='py-2 px-4 border-b'>Repaired</th>
						<th className='py-2 px-4 border-b' colSpan={3}>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{currentVehicles.length > 0 ? (
						currentVehicles.map((vehicle, i) => (
							<tr key={vehicle.id} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
								<td className='py-2 px-4 border-b'>{vehicle.id}</td>
								<td className='py-2 px-4 border-b'>{vehicle.make}</td>
								<td className='py-2 px-4 border-b'>{vehicle.model}</td>
								<td className='py-2 px-4 border-b'>{vehicle.registration}</td>
								<td className='py-2 px-4 border-b'>
									{vehicle.repaired.toString() === 'true' ? (
										<FaCheck />
									) : (
										<FaTimes />
									)}
								</td>
								<td className='py-2 px-4 border-b'>
									<button
										onClick={() => handleView(vehicle)}
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'>
										View
									</button>
								</td>
								<td className='py-2 px-4 border-b'>
									<button
										onClick={() => handleEdit(vehicle.id)}
										className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'>
										Edit
									</button>
								</td>
								<td className='py-2 px-4 border-b'>
									<button
										onClick={() => handleDelete(vehicle.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300'>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={7} className='py-2 px-4 border-b'>
								No vehicles
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{vehicles.length > vehiclesPerPage && (
				<div className='flex justify-center mt-4 gap-[4vw]'>
					<button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						className={`${
							currentPage === 1
								? 'bg-gray-500'
								: 'bg-blue-500 hover:bg-blue-700'
						} text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline transition-colors duration-300`}>
						Back
					</button>
					<button
						onClick={handleNextPage}
						disabled={lastVehicleIndex >= vehicles.length}
						className={`${
							lastVehicleIndex >= vehicles.length
								? 'bg-gray-500'
								: 'bg-blue-500 hover:bg-blue-700'
						} text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline transition-colors duration-300`}>
						Next
					</button>
				</div>
			)}
			{selectedVehicle && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75'>
					<div className='bg-white p-4 rounded shadow w-[95vw] max-w-[600px]'>
						<h2 className='text-lg font-bold mb-4'>Vehicle Details</h2>
						<p>
							<strong>Make:</strong> {selectedVehicle.make}
						</p>
						<p>
							<strong>Model:</strong> {selectedVehicle.model}
						</p>
						<p>
							<strong>Registration:</strong> {selectedVehicle.registration}
						</p>
						<p>
							<strong>Notes:</strong> {selectedVehicle.notes || 'N/A'}
						</p>
						<p>
							<strong>Repaired:</strong>{' '}
							{selectedVehicle.repaired ? 'Yes' : 'No'}
						</p>
						<button
							onClick={handleCloseModal}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300'>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Table;
