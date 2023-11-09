// export const getVehicles = async () => {
// 	const response = await fetch(`http://localhost:3000/vehicles`);
// 	const data = await response.json();
// 	if (data) {
// 		setVehicles(data);
// 	} else {
// 		setVehicles(
// 			() => JSON.parse(localStorage.getItem('vehicles')) || vehiclesData
// 		);
// 		setIsLoading(false);
// 	}
// };
