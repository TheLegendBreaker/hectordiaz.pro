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
					document.querySelector('#folio .cl-container ').innerHTML = card;

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
renderFolioClients();
renderFolioProjects();
renderXpItems();
renderStack();
