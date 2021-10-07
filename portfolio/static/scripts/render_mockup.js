let qSlug = window.location.search;
qSlug = qSlug.replace('?','');
const src = getMediaSrcBySlug(qSlug);

// next to set up a script for the cta button to add the qSlugs file name sans extenstion as a query param to the qSlug uri
// Then to take that query and turn it into a path 
// finally update the rendering img tag's src attribute.

// also need to set it up so that if no param is present then the qSlug page redirect the user to the foilo section of the home page.

renderMockup = async function() {
	let img = document.getElementById('render');
	await src
		.then(lnk => {
			img.src = lnk;
		})

}

renderMockup();
