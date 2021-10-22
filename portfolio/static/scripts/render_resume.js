renderResume = async function(){
	let target = document.getElementById('render');
	await getMediaSrcBySlug('hector_diaz_developer_resume')
		.then(src => {
			target.src = src;
			//iframe.src = src+"#view=fitH";
		})
}

renderResume();
