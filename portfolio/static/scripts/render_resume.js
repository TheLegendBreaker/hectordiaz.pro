renderResume = async function(){
	let img = document.getElementById('render');
	await getMediaSrcBySlug('hector_diaz_developer_resume')
		.then(src => {
			img.src = src;
		})
}

renderResume();
