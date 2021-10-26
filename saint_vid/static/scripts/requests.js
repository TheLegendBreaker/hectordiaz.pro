var baseUrl = 'https://api.hectordiaz.pro/saint-vid/wp-json/wp/v2';
var basePostUrl = baseUrl+'/posts';
var baseCatUrl = baseUrl+'/categories';
var baseMediaUrl = baseUrl+'/media';

buildUrl = function(){}

buildPostUrl = function(route="") {
	const qUrl = basePostUrl + route;
	return qUrl;
}


getShop = async function() {
	const qUrl = buildPostUrl('?_embed&search=Etsy Shop'),
	shopPage = await getRequest(qUrl)
	.then( res => { return res; } );
	return shopPage;
}

getTipJar= async function() {
	const qUrl = buildPostUrl('?_embed&search=Tip Jar'),
	tipPage = await getRequest(qUrl)
	.then( res => { return res; } );
	return tipPage;
}
getTipJarSrc = async function() {
	const qUrl = baseUrl + "/plugins/Tip Jar WP"
	tipSrc = await getRequest(qUrl)
	.then( res => { console.log(res); return res; } );
	return tipSrc;
}

renderShop = async function () {
	await getShop()
		.then(shop  => {
			//console.log('here are the items from wp', items);
			let param = '',
			card = '';
			//if (items!=undefined) { 
				for(const i in shop) {
					console.log(shop[i]);

						card += `
							<div id="shop" class="align">
							${shop[i].content.rendered}
							</div>
							`

					}
					document.querySelector('.shop-container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}

renderTipJar = async function () {
	await getTipJar()
		.then(tipJar  => {
			//console.log('here are the items from wp', items);
			let param = '',
			card = '';
			//if (items!=undefined) { 
				for(const i in tipJar) {
					console.log(tipJar[i]);

						card += `
							<div id="tips" class="align">
							${tipJar[i].content.rendered}
							</div>
							`

					}
					document.querySelector('.tipjar-container ').innerHTML = card;

				return card;
				//}
			}
		).catch(err=>console.log(err));

}
renderShop();
renderTipJar();
getTipJarSrc();

