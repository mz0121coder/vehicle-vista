import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { carBrands } from '../../data/carBrands';
import { server } from '../../data/atoms';
import { useRecoilValue } from 'recoil';

const Edit = ({ vehicles, selectedVehicle, setVehicles, setIsEditing }) => {
	const id = selectedVehicle.id;
	const [make, setMake] = useState(selectedVehicle.make);
	const [model, setModel] = useState(selectedVehicle.model);
	const [registration, setRegistration] = useState(
		selectedVehicle.registration
	);
	const [notes, setNotes] = useState(selectedVehicle.notes);
	const [repaired, setRepaired] = useState(selectedVehicle.repaired.toString());
	const [suggestions, setSuggestions] = useState([]);
	const isServer = useRecoilValue(server);

	useEffect(() => {
		localStorage.setItem('vehicles', JSON.stringify(vehicles));
	}, [vehicles]);

	const handleUpdate = async e => {
		e.preventDefault();
		setSuggestions([]);

		if (!make || !model || !registration || !repaired) {
			return Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: 'All fields except Notes are required.',
				showConfirmButton: true,
			});
		}

		const updatedVehicle = {
			id,
			make,
			model,
			registration,
			notes,
			repaired,
		};
		// PUT request if server is running
		if (isServer) {
			try {
				const response = await fetch(`http://localhost:3000/vehicles/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedVehicle),
				});

				if (!response.ok) {
					throw new Error('Failed to update vehicle');
				}
			} catch (error) {
				console.error(error);
			}
		}
		// update is outside of try catch - still use localStorage when server isn't running
		const updatedVehicles = vehicles.map(vehicle =>
			vehicle.id === id ? updatedVehicle : vehicle
		);
		setVehicles(updatedVehicles);
		setIsEditing(false);
		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: `${updatedVehicle.make} ${updatedVehicle.model}'s data has been updated.`,
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const handleMakeChange = e => {
		const value = e.target.value;
		setMake(value);

		const filteredSuggestions = carBrands.filter(brand =>
			brand.toLowerCase().includes(value.toLowerCase())
		);

		if (filteredSuggestions.length <= 3) {
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = suggestion => {
		setMake(suggestion);
		setSuggestions([]);
	};

	return (
		<div className='mx-auto w-[95vw] max-w-[600px] mt-8'>
			<form
				onSubmit={handleUpdate}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<h1 className='text-2xl font-bold mb-6'>Edit Vehicle</h1>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='make'>
						Make
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='make'
						type='text'
						name='make'
						value={make}
						onChange={handleMakeChange}
						required
					/>
					{suggestions.length > 0 && (
						<ul className='mt-2 bg-white border border-gray-300 rounded'>
							{suggestions.map(suggestion => (
								<li
									key={suggestion}
									className='px-4 py-2 cursor-pointer hover:bg-gray-100'
									onClick={() => handleSuggestionClick(suggestion)}>
									{suggestion}
								</li>
							))}
						</ul>
					)}
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='model'>
						Model
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='model'
						type='text'
						name='model'
						value={model}
						onChange={e => setModel(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='registration'>
						Registration
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='registration'
						type='text'
						name='registration'
						value={registration}
						onChange={e => setRegistration(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='notes'>
						Notes
					</label>
					<textarea
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='notes'
						type='text'
						name='notes'
						value={notes}
						onChange={e => setNotes(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='repaired'>
						Repaired
					</label>
					<select
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='repaired'
						name='repaired'
						value={repaired}
						onChange={e => setRepaired(e.target.value)}
						required>
						<option value=''>Select</option>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
				</div>
				<div>
					<input
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4'
						type='submit'
						value='Update'
					/>
					<input
						className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='button'
						value='Cancel'
						onClick={() => setIsEditing(false)}
					/>
				</div>
			</form>
		</div>
	);
};

export default Edit;
