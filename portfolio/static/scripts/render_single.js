// get the id from the url
getIdParam = function(){
	let url = window.location.href;
	url = url.split("/")
	return url[url.length - 1];
}
// next a function that uses this function to get a post by id.

// render funcs

renderFolioClients = async function () {
	await getClients()
		.then(items => {
			//console.log('here are the items from wp', items);
			let imgSrc = ''
			param = ''
			card = '';
			//if (items!=undefined) { 
				for(const i in items) {

						if (items[i]._embedded) {
							imgSrc = items[i]._embedded['wp:featuredmedia'][0].source_url;
							param = items[i]._embedded['wp:featuredmedia'][0].slug;
						}

						card += `
							<div class="card-container ">
							<article class="card border">
							<figure>
							<div class="crop">
							<img src="${imgSrc}" alt="/clients/UnionBaptist_About.png"/>
							</div>
							</figure>
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content align">
							<div class="align">
							${items[i].content.rendered}
							</div>
							<div class="cta-container align">
								<a href="/mockup?${param}" class="in-blc btn cta">
									View mock up.
								</a>
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#single .container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}
renderFolioProjects = async function () {
	await getProjects()
		.then(items => {
			//console.log('here are the items from wp', items);
			let imgSrc = ''
			param = ''
			card = '';
			//if (items!=undefined) { 
				for(const i in items) {
					console.log(items[i]);

						if (items[i]._embedded) {
							imgSrc = items[i]._embedded['wp:featuredmedia'][0].source_url;
							// need to add an alt veriable
						}

						card += `
							<div class="card-container ">
							<article class="card border">
							<figure>
							<div class="crop">
							<img src="${imgSrc}" alt="/clients/UnionBaptist_About.png"/>
							</div>
							</figure>
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content align">
							<div class="align">
							${items[i].content.rendered}
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#single .container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

// end render funcs
renderFolioClients();
renderFolioProjects();
