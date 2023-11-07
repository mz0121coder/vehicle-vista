import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { vehiclesData } from '../../data/vehiclesData';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firestore.js';

const Dashboard = ({ setIsAuthenticated }) => {
	const [vehicles, setVehicles] = useState();
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const getEmployees = async () => {
		const querySnapshot = await getDocs(collection(db, 'vehicles'));
		querySnapshot.forEach(doc => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
		});
		setEmployees(employees);
	};

	useEffect(() => {
		// TODO: create getEmployees function and call it here
		getEmployees();
	}, []);

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
				// TODO delete document
				Swal.fire({
					icon: 'success',
					title: 'Deleted!',
					text: `${vehicle.make} ${vehicle.model}'s data has been deleted.`,
					showConfirmButton: false,
					timer: 1500,
				});
				const vehiclesCopy = vehicles.filter(vehicle => vehicle.id !== id);
				setVehicles(vehiclesCopy);
			}
		});
	};

	return (
		<div className='container mx-auto'>
			{!isAdding && !isEditing && (
				<>
					<Header
						setIsAdding={setIsAdding}
						setIsAuthenticated={setIsAuthenticated}
					/>
					<Table
						vehicles={vehicles}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</>
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
