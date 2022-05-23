// render funcs

renderFolioClientsExcerpt = async function () {
	await getThreeClients()
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
							<div class="card-container rendered">
							<article class="card border">
							<figure>
							<div class="crop after-fill" style="background-image:url( ${imgSrc} );">
							<img src="${imgSrc}" class="pos-rel" alt="/clients/UnionBaptist_About.png"/>
							</div>
							</figure>
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content align">
							<div class="align">
							${items[i].excerpt.rendered}
							</div>
							<div class="cta-container align">
								<a href="/clients/${items[i].id}" class="in-blc btn cta">
									Read more.
								</a>
								<a href="/mockup?${param}" class="in-blc btn cta">
									View mock up.
								</a>
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#folio .cl-container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

renderFolioReviewExcerpts = async function () {
	await getThreeReviews()
		.then(items => {
			//console.log('here are the items from wp', items);
			let imgSrc = ''
			param = ''
			card = '';
			//if (items!=undefined) { 
			console.log(items);
				for(const i in items) {

						if (items[i]._embedded['wp:featuredmedia']) {
							imgSrc = items[i]._embedded['wp:featuredmedia'][0].source_url;
							param = items[i]._embedded['wp:featuredmedia'][0].slug;
						}

						card += `
							<div class="card-container rendered">
							<article class="card border">
							<figure>
							<div class="crop after-fill" style="background-image:url( ${imgSrc} );">
							<img src="${imgSrc}" class="pos-rel" alt="/clients/UnionBaptist_About.png"/>
							</div>
							</figure>
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content align">
							<div class="align">
							${items[i].excerpt.rendered}
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#folio .rvw-container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

renderFolioProjectsExcerpt = async function () {
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
							<div class="card-container rendered">
							<article class="card border">
							<figure>
							<div class="crop after-fill" style="background-image:url( ${imgSrc} );">
							<img src="${imgSrc}" class="pos-rel" alt="/clients/UnionBaptist_About.png"/>
							</div>
							</figure>
							<div class="main">
							<h3 class="title"><span class="align">${items[i].title.rendered}</span></h3>
							<div class="content align">
							<div class="align">
							${items[i].excerpt.rendered}
							</div>
							</article>
							</div>
							`

					}
					document.querySelector('#folio .pj-container ').innerHTML = card;

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
// page actions

if (window.innerWidth <= 500){

	scrollActions = function() {

		const folioItems = document.querySelectorAll('#folio .card-container.rendered');
		const scrollPosition = window.scrollY;

		folioItems.forEach(function(item){
			const itemRect = item.getBoundingClientRect(),
				elementTop = itemRect.top,
				elementBottom = itemRect.bottom;

			if ( (scrollPosition >= elementTop) && (scrollPosition <= elementBottom) ) {
				item.classList.add('observed');
			} else {
				item.classList.remove('observed');
			}
		}
		)

	};

	window.addEventListener('scroll', scrollActions);
}
// end page actions
// invoke

renderFolioClientsExcerpt();
renderFolioReviewExcerpts();
renderFolioProjectsExcerpt();
renderXpItems();
renderStack();

// end invoke
