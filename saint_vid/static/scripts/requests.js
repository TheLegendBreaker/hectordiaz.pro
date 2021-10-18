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
	const qUrl = buildPostUrl('?search=Etsy Shop'),
	shopPage = await getRequest(qUrl)
	.then( res => { return res; } );
	return shopPage;
}

renderShop = async function () {
	await getShop()
		.then(shop  => {
			//console.log('here are the items from wp', items);
			let param = '',
			card = '';
			//if (items!=undefined) { 
				for(const i in shop) {

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

renderShop();

