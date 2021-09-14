// request functions

// Example POST method implementation:
postRequest = async function(url = '', Request = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(Request) 
  });
	return response.json();
}

putRequest = async function(url = '', Request = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'PUT',
		mode: 'cors', 
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(Request) 
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

getRequest = async function(url = '') {
	const response = await fetch(url);

  return response.json();
}

deleteRequest = async function(url = '') {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'DELETE',
		mode: 'cors', 
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

// end request functions
// item request

var baseUrl = 'http://gsd.hectordiaz.pro/';

getItem = function(itemId) {
	let url = baseUrl + 'item/' + itemId,
		item;
	console.log('the url '+ url);
	getRequest( url )
		.then( (data) => console.log('data from request',data));
}

createItem = function(item) {
	let url = baseUrl + 'item';
	postRequest( url, item )
		.then( (data) => console.log('data from request',data['result']));
}

updateItem = function(item) {
	let url = baseUrl + 'item/' + item.id;
	putRequest( url, item )
		.then( (data) => console.log('data from request',data['result']));
}

deleteItem = function(itemId) {
	let url = baseUrl + 'item/' + itemId;
	deleteRequest( url )
		.then( (data) => console.log('data from request',data['result']));
}

// end item request
// tag request
// end tag request
// priority request
// end priority request
// backlog request
// end backlog request
// goal request
// end goal request
