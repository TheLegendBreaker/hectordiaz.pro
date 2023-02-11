getRequest = async function(url) {
	const response = await fetch(url)
		.then(req => req.json())
		.catch(err => console.log(err));
	return response;
}
