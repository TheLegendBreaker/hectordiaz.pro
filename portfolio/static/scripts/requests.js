// get posts by categroy id

var baseUrl = 'http://portfolio.localhost/wp-json/wp/v2/posts';

getWebsiteBuilds = async function() {
	const url = baseUrl + '?categories=8&_embed';
	const builds = getRequest(url);
	return builds;
}

getExperienceItems = async function() {
	const url = baseUrl + '?categories=9&_embed';
	const xp = getRequest(url);
	return xp;
}

getStackOfChoice = async function() {
	const url = baseUrl + '?slug=stack-of-choice&_embed';
	const stack = getRequest(url);
	return stack;
}

renderFolioItems = async function () {
	await getWebsiteBuilds()
		.then(items => {
			console.log(items);
			let imgSrc = ''
			card = '';
			if (items!=undefined) { for(const i in items) {
					console.log(items[i])

						if (items[i]._embedded['wp:featuredmedia']) {
							imgSrc = items[i]._embedded['wp:featuredmedia'][0].source_url;
						}

						card += `
							<div class="card-container ">
							<article class="card border">
							<figure>
							<div class="crop"><img src="${imgSrc}" alt="/clients/UnionBaptist_About.png"/>
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

				}
			}
		).catch(err=>console.log(err));

}

renderXpItems = async function () {
	await getExperienceItems()
		.then(items => {
			console.log(items);
			card = '';
			if (items!=undefined) {

				for(const i in items) {
					console.log(items[i])

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
			console.log(stack);
			if (stack!=undefined) {
				const card = `
					<div class="card-container ">
					<article class="card">
					<div class="main">
					<h3 class="title sr-only"><span class="align">${stack[0].title.rendered}</span></h3>
					<div class="content align">
					<div class="align">
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

renderFolioItems();
renderXpItems();
renderStack();
