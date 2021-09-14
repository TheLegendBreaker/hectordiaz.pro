// url funcs

var baseUrl = 'http://api.hectordiaz.pro/portfolio/wp-json/wp/v2/posts';
var baseCatUrl = 'http://api.hectordiaz.pro/portfolio/wp-json/wp/v2/categories';

buildUrl = function(route="") {
	const qUrl = baseUrl + route;
	return qUrl;
}

buildFilterUrl = function(filter="") {
	const qUrl =  buildUrl( '?filter['+filter+']=MyCategorey' );
	return qUrl;

}

// end url funcs
// request funcs
// filter request funcs

getCategoryId = async function(catSlug="") {
	const qUrl = baseCatUrl +"?slug="+ catSlug,
	catId = await getRequest(qUrl)
	.then( cat => { return cat[0].id } );
	return catId;
}

getPostByCategory = async function(catSlug=""){
	const posts = await getCategoryId(catSlug)
		.then( catId => { 
			const qUrl = buildUrl('?categories='+catId);
			return getRequest(qUrl);
		} )
	return posts;
}

// end filter request funcs

getWebsiteBuilds = async function() {
	const builds = getPostByCategory('folio-item');
	return builds;
}

getExperienceItems = async function() {
	const xp = getPostByCategory('experience');
	return xp;
}

getStackOfChoice = async function() {
	const url = baseUrl + '?slug=stack-of-choice&_embed',
	stack = getRequest(url);
	return stack;
}

// end request funcs
// render funcs

renderFolioItems = async function () {
	await getWebsiteBuilds()
		.then(items => {
			let imgSrc = ''
			card = '';
			//if (items!=undefined) { 
				for(const i in items) {

						if (items[i]._embedded) {
							imgSrc = items[i]._embedded['wp:featuredmedia'][0].source_url;
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
							</div><a class="btn cta" href="#">
								Hey! try this!
							</a>
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#folio div.container').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

renderXpItems = async function () {
	await getExperienceItems()
		.then(items => {
			card = '';
			if (items!=undefined) {

				for(const i in items) {

					if (items[i].categories.length <= 1) {
						card = `
							<div class="${i} card-container">
							<article class="card">
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content">
							<div class="align">
							${items[i].content.rendered}
							</article>
							</div>
							` + card;
					}

				}
				document.querySelector('#xp div.xp-container').innerHTML = card;
			}

			}
		)

}

renderStack = async function () {
	await getStackOfChoice()
		.then(stack => {

			if (stack!=undefined) {
				const card = `
					<div class="card-container ">
					<article class="card">
					<div class="main">
					${stack[0].content.rendered}
					</div>
					</article>
					</div>
					`

				document.querySelector('#stack div.container').innerHTML = card;
			}

			}
		)

}

// end render funcs

renderFolioItems().then(items=>console.log(items))
renderXpItems();
renderStack();
