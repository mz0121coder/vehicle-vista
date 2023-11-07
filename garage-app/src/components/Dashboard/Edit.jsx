import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../config/firestore';
import { doc, setDoc } from 'firebase/firestore';

const Edit = ({
	vehicles,
	selectedVehicle,
	setVehicles,
	setIsEditing,
	getVehicles,
}) => {
	const id = selectedVehicle.id;
	const [make, setMake] = useState(selectedVehicle.make);
	const [model, setModel] = useState(selectedVehicle.model);
	const [registration, setRegistration] = useState(
		selectedVehicle.registration
	);
	const [notes, setNotes] = useState(selectedVehicle.notes);
	const [repaired, setRepaired] = useState(selectedVehicle.repaired);

	const handleUpdate = async e => {
		e.preventDefault();
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

		// Add a new document in collection "vehicles"
		await setDoc(doc(db, 'vehicles', id), {
			...updatedVehicle,
		});

		const updatedVehicles = vehicles.map(vehicle =>
			vehicle.id === id ? updatedVehicle : vehicle
		);

		setVehicles(updatedVehicles);
		setIsEditing(false);
		getVehicles();

		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: `${updatedVehicle.make} ${updatedVehicle.model}'s data has been updated.`,
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<div className='container mx-auto'>
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
						onChange={e => setMake(e.target.value)}
						required
					/>
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
