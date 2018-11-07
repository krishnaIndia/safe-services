const whiteListedDomains= {
	'http://localhost:8080': 'dc4963cfc1',
};

export default {
	PORT: 8080,
	getListId: (key) => whiteListedDomains[key]
};