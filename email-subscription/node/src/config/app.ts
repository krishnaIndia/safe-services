const whiteListedDomains= {
	'https://safenetwork.tech': '48a0331971',
	'https://deploy-preview-115--keen-stonebraker-bb1a10.netlify.com/': '48a0331971',
};

export default {
	PORT: 8080,
	getListId: (key) => whiteListedDomains[key]
};
