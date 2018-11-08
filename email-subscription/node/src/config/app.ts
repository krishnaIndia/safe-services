const whiteListedDomains= {
	'http://localhost:8080': '61ce397f57',
};

export default {
	PORT: 8080,
	getListId: (key) => whiteListedDomains[key]
};