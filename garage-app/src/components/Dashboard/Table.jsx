import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Table = ({ vehicles, handleEdit, handleDelete }) => {
	return (
		<div className='container mx-auto'>
			<table className='w-full bg-white border border-gray-300'>
				<thead>
					<tr className='bg-gray-200'>
						<th className='py-2 px-4 border-b'>Id</th>
						<th className='py-2 px-4 border-b'>Make</th>
						<th className='py-2 px-4 border-b'>Model</th>
						<th className='py-2 px-4 border-b'>Reg.</th>
						<th className='py-2 px-4 border-b'>Notes</th>
						<th className='py-2 px-4 border-b'>Repaired</th>
						<th className='py-2 px-4 border-b' colSpan={2}>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{vehicles ? (
						vehicles.map((vehicle, i) => (
							<tr key={vehicle.id} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
								<td className='py-2 px-4 border-b'>{vehicle.id}</td>
								<td className='py-2 px-4 border-b'>{vehicle.make}</td>
								<td className='py-2 px-4 border-b'>{vehicle.model}</td>
								<td className='py-2 px-4 border-b'>{vehicle.registration}</td>
								<td className='py-2 px-4 border-b'>{vehicle.notes}</td>
								<td className='py-2 px-4 border-b'>
									{vehicle.repaired ? <FaCheck /> : <FaTimes />}
								</td>
								<td className='py-2 px-4 border-b text-right'>
									<button
										onClick={() => handleEdit(vehicle.id)}
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
										Edit
									</button>
								</td>
								<td className='py-2 px-4 border-b text-left'>
									<button
										onClick={() => handleDelete(vehicle.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
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
		</div>
	);
};

export default Table;
