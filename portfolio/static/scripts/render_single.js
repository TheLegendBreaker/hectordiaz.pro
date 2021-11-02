// get the id from the url
getIdParam = function(){
	let url = window.location.href;
	url = url.split("/")
	return url[url.length - 1];
}
// next a function that uses this function to get a post by id.

// render funcs

renderSingle = async function () {
	const id = getIdParam();
	await getPostById(id)
		.then(item => {
			//console.log('here are the items from wp', items);
			console.log(item);
			let imgSrc = ''
			param = ''
			card = '';

					if (item._embedded) {
						imgSrc = item._embedded['wp:featuredmedia'][0].source_url;
						param = item._embedded['wp:featuredmedia'][0].slug;
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
						<h3 class="title"><span class="align">${item.title.rendered}</span></h3>
						<div class="content align">
						<div class="align">
						${item.content.rendered}
						</div>
						<div class="cta-container align">
							<a href="/mockup?${param}" class="in-blc btn cta">
								View mock up.
							</a>
						</div>
						</article>
						</div>
						`

				document.querySelector('#single .container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

// end render funcs
renderSingle();
