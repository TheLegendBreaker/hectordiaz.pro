// url funcs

var baseUrl = 'http://api.hectordiaz.pro/portfolio/wp-json/wp/v2';
var basePostUrl = baseUrl+'/posts';
var baseCatUrl = baseUrl+'/categories';
var baseMediaUrl = baseUrl+'/media';

buildPostUrl = function(route="") {
	const qUrl = basePostUrl + route;
	return qUrl;
}

buildFilterUrl = function(filter="") {
	const qUrl =  buildPostUrl( '?filter['+filter+']=MyCategorey' );
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
			const qUrl = buildPostUrl('?_embed&categories[]='+catId);
			const response =  getRequest(qUrl);
			return response;
		} )
	return posts;
}

getMediaBySlug = async function(qSlug=""){
	const qUrl = baseMediaUrl + "?slug=" + qSlug;
	media = await getRequest(qUrl)
		.then(response => { return response[0] });
	return media;
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
	const url = basePostUrl + '?slug=stack-of-choice&_embed',
	stack = getRequest(url);
	return stack;
}

getMediaSrcBySlug = async function(qSlug=""){
	const src = await getMediaBySlug(qSlug)
		.then( media => {
			return media.source_url;
		})
	return src;
}

// end request funcs
