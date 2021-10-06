const mockup = window.location.search;

	// next to set up a script for the cta button to add the mockups file name sans extenstion as a query param to the mockup uri
	// Then to take that query and turn it into a path 
	// finally update the rendering img tag's src attribute.

if (mockup === '?stjoe') {
	console.log('stjoe valley mockup');
}
else if (mockup === '?unionbaptist') {
	console.log('union baptist valley mockup');
}
else if (mockup === '?energyplus') {
	console.log('energy plus valley mockup');
}
