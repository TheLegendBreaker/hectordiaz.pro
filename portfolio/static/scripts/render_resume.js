renderResume = async function(){
	let iframe = document.getElementById('render');
	await getMediaSrcBySlug('hector_diaz_developer_resume')
		.then(src => {
			iframe.src = src+"#view=fitH";
		})
}

renderResume();
