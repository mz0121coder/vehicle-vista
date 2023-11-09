const vehiclesData = [
	{
		id: 1,
		make: 'Honda',
		model: 'Civic',
		registration: 'AB12CVT',
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		repaired: true,
	},
	{
		id: 2,
		make: 'Toyota',
		model: 'Corolla',
		registration: 'DE56FQL',
		notes:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		repaired: false,
	},
	{
		id: 3,
		make: 'Nissan',
		model: 'Altima',
		registration: 'GH90IXC',
		notes:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		repaired: true,
	},
	{
		id: 4,
		make: 'Ford',
		model: 'Mustang',
		registration: 'JK34LAV',
		notes:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		repaired: false,
	},
	{
		id: 5,
		make: 'Chevrolet',
		model: 'Cruze',
		registration: 'MN78TBN',
		notes:
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
		repaired: true,
	},
	{
		id: 6,
		make: 'Volkswagen',
		model: 'Golf',
		registration: 'PQ12RXI',
		notes:
			'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
		repaired: false,
	},
	{
		id: 7,
		make: 'BMW',
		model: 'X5',
		registration: 'ST56UHJ',
		notes:
			'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
		repaired: true,
	},
	{
		id: 8,
		make: 'Mercedes-Benz',
		model: 'E-Class',
		registration: 'VW90XWA',
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		repaired: false,
	},
	{
		id: 9,
		make: 'Audi',
		model: 'A4',
		registration: 'YZ34ARF',
		notes:
			'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
		repaired: true,
	},
	{
		id: 10,
		make: 'Hyundai',
		model: 'Elantra',
		registration: 'CD78FIR',
		notes:
			'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
		repaired: false,
	},
	{
		id: 11,
		make: 'Tesla',
		model: 'Model S',
		registration: 'EF90TSL',
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		repaired: true,
	},
	{
		id: 12,
		make: 'Kia',
		model: 'Sportage',
		registration: 'GH45KIA',
		notes:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		repaired: false,
	},
	{
		id: 13,
		make: 'Subaru',
		model: 'Forester',
		registration: 'IJ78SBR',
		notes:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		repaired: true,
	},
	{
		id: 14,
		make: 'Lexus',
		model: 'RX',
		registration: 'KL23LXS',
		notes:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		repaired: false,
	},
	{
		id: 15,
		make: 'Mazda',
		model: 'CX-5',
		registration: 'NO56MDZ',
		notes:
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
		repaired: true,
	},
	{
		id: 16,
		make: 'Mitsubishi',
		model: 'Outlander',
		registration: 'WX56MTS',
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		repaired: true,
	},
	{
		id: 17,
		make: 'Jeep',
		model: 'Wrangler',
		registration: 'YZ78JPW',
		notes:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		repaired: false,
	},
	{
		id: 18,
		make: 'Volvo',
		model: 'XC90',
		registration: 'KL23VLV',
		notes:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		repaired: true,
	},
	{
		id: 19,
		make: 'Porsche',
		model: '911',
		registration: 'GH56PCH',
		notes:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		repaired: false,
	},
	{
		id: 20,
		make: 'Ferrari',
		model: '488 GTB',
		registration: 'NO23FRR',
		notes:
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
		repaired: true,
	},
];

const vehiclesPerPage = 7;

export { vehiclesData, vehiclesPerPage };
