// render funcs

archiveItemMarkup = function(item){
	let markup = ``;
	if (item._embedded) {
		imgSrc = item._embedded['wp:featuredmedia'][0].source_url;
		param = item._embedded['wp:featuredmedia'][0].slug;
	}

	markup += `
		<div class="card-container rendered">
		<article class="card border">
		<figure>
		<div class="crop after-fill" style="background-image:url( ${imgSrc} );">
		<img src="${imgSrc}" class="pos-rel" alt="/clients/UnionBaptist_About.png"/>
		</div>
		</figure>
		<div class="main">
		<h3 class="title"><span class="align">${item.title.rendered}</span></h3>
		<div class="content align">
		<div class="align">
		${item.excerpt.rendered}
		</div>
		<div class="cta-container align">
			<a href="/clients/${item.id}" class="in-blc btn cta">
				Read more.
			</a>
			<a href="/mockup?${param}" class="in-blc btn cta">
				View mock up.
			</a>
		</div>
		</article>
		</div>
		`


	return markup;
}

renderArchiveClientsExcerpt = async function () {
	render('#archive div.container', getClients, archiveItemMarkup);
}

renderArchiveProjectsExcerpt = async function () {
	render('#archive div.container', getProjects, archiveItemMarkup);
}

// invoke

const urlArray = buildUrlArray(),
	pgTitle = document.querySelector('.title');
console.log(urlArray);

if (urlArray[3] === 'clients'){
	renderArchiveClientsExcerpt();
	pgTitle.innerHTML = 'Clients';
}
else if (urlArray[3] === 'projects'){
	renderArchiveProjectsExcerpt();
	pgTitle.innerHTML = 'Projects';
}
// end invoke
