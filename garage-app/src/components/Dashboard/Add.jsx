import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Add = ({ vehicles, setVehicles, setIsAdding }) => {
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [registration, setRegistration] = useState('');
	const [notes, setNotes] = useState('');
	const [repaired, setRepaired] = useState('');

	useEffect(() => {
		localStorage.setItem('vehicles', JSON.stringify(vehicles));
		console.log({ vehicles });
	}, [vehicles]);

	const handleAdd = async e => {
		e.preventDefault();
		if (!make || !model || !registration || !repaired) {
			return Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: 'All fields are required.',
				showConfirmButton: true,
			});
		}

		const newVehicle = {
			make,
			model,
			registration,
			notes,
			repaired,
		};

		const updatedVehicles = [...vehicles, newVehicle];

		setVehicles(updatedVehicles);
		setIsAdding(false);

		Swal.fire({
			icon: 'success',
			title: 'Added!',
			text: `${make} ${model}'s data has been added.`,
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<div className='mx-auto w-[95vw] max-w-[600px] mt-8'>
			<form
				onSubmit={handleAdd}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<h1 className='text-2xl font-bold mb-6'>Add Vehicle</h1>
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
						value='Add'
					/>
					<input
						className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='button'
						value='Cancel'
						onClick={() => setIsAdding(false)}
					/>
				</div>
			</form>
		</div>
	);
};

export default Add;
