const whiteListedDomains= {
	'https://safenetwork.tech': '61ce397f57',
	'https://deploy-preview-115--keen-stonebraker-bb1a10.netlify.com/': '61ce397f57',
};

export default {
	PORT: 8080,
	getListId: (key) => whiteListedDomains[key]
};
