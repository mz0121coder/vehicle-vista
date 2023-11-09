import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { vehiclesData } from '../../data/vehiclesData';

const Dashboard = ({ setIsAuthenticated }) => {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getVehicles = async () => {
			const response = await fetch(`http://localhost:3000/vehicles`);
			const data = await response.json();
			if (data) {
				setVehicles(data);
			} else {
				setVehicles(
					() => JSON.parse(localStorage.getItem('vehicles')) || vehiclesData
				);
			}
			setIsLoading(false);
		};
		getVehicles();
	}, []);

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
				// DELETE request if server is running
				try {
					fetch(`http://localhost:3000/vehicles/${id}`, {
						method: 'DELETE',
					});
				} catch (error) {
					console.error(error);
				}
				// filter vehicles outside of try catch - use localStorage when server isn't running
				const vehiclesCopy = vehicles.filter(vehicle => vehicle.id !== id);
				setVehicles(vehiclesCopy);
			}
		});
	};

	const resetData = async () => {
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
		}).then(async result => {
			if (result.value) {
				try {
					await fetch('http://localhost:3000/vehicles', {
						method: 'DELETE',
					});

					await fetch('http://localhost:3000/vehicles', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(vehiclesData),
					});
				} catch (error) {
					console.error(error);
				}
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
			{isLoading ? (
				<div>Loading...</div>
			) : (
				!isAdding &&
				!isEditing && (
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
				)
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
