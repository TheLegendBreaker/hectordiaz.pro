getRequest = async function(url='',request={}) {
	const response = await fetch(url)
		.then(req => req.json())
		.catch(err => console.log(err));
	return response;
}
