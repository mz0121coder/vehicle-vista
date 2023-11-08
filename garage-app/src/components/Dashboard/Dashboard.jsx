import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { vehiclesData } from '../../data/vehiclesData';

const Dashboard = ({ setIsAuthenticated }) => {
	const [vehicles, setVehicles] = useState(
		() => JSON.parse(localStorage.getItem('vehicles')) || vehiclesData
	);

	console.log({ vehicles });
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		localStorage.setItem('vehicles', JSON.stringify(vehicles));
	}, [vehicles]);

	const handleEdit = id => {
		const [vehicle] = vehicles.filter(vehicle => vehicle.id === id);
		setSelectedVehicle(vehicle);
		setIsEditing(true);
	};

	const handleDelete = id => {
		Swal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		}).then(result => {
			if (result.value) {
				const [vehicle] = vehicles.filter(vehicle => vehicle.id === id);
				Swal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: `${vehicle.make} ${vehicle.model}'s data has been deleted.`,
					showConfirmButton: false,
					timer: 1500,
				});
				const vehiclesCopy = vehicles.filter(vehicle => vehicle.id !== id);
				setVehicles(vehiclesCopy);
				// localStorage.removeItem('vehicles');
			}
		});
	};

	const resetData = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			text: 'This will reset all vehicle data to the initial state.',
			showCancelButton: true,
			confirmButtonText: 'Yes, reset data!',
			cancelButtonText: 'No, cancel!',
			customClass: {
				confirmButton:
					'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
				cancelButton:
					'bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
			},
		}).then(result => {
			if (result.value) {
				setVehicles(vehiclesData);
				localStorage.removeItem('vehicles');
				Swal.fire({
					icon: 'success',
					title: 'Reset!',
					text: 'All vehicle data has been reset.',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};

	return (
		<div className='mx-auto'>
			{!isAdding && !isEditing && (
				<div className='w-fit mx-auto mt-2 z-10'>
					<Header
						setIsAdding={setIsAdding}
						setIsAuthenticated={setIsAuthenticated}
						resetData={resetData}
					/>
					<Table
						vehicles={vehicles}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</div>
			)}
			{isAdding && (
				<Add
					vehicles={vehicles}
					setVehicles={setVehicles}
					setIsAdding={setIsAdding}
				/>
			)}
			{isEditing && (
				<Edit
					vehicles={vehicles}
					selectedVehicle={selectedVehicle}
					setVehicles={setVehicles}
					setIsEditing={setIsEditing}
				/>
			)}
		</div>
	);
};

export default Dashboard;
