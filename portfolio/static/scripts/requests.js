// url funcs

var baseUrl = 'https://api.hectordiaz.pro/portfolio/wp-json/wp/v2';
var basePostUrl = baseUrl+'/posts';
var baseCatUrl = baseUrl+'/categories';
var baseMediaUrl = baseUrl+'/media';

buildPostUrl = function(route="") {
	const qUrl = basePostUrl + route;
	return qUrl;
}

buildFilterUrl = function(filter="",value="") {
	const qUrl =  buildPostUrl( '?filter['+filter+']='+value);
	return qUrl;

}

//buildCatFilterUrl = function(filter="") {
	//const value="MyCategorey"
		//, qUrl =  buildPostUrl(filter, value);
	//return qUrl;

//}

// end url funcs
// request funcs
// filter request funcs

getCategoryId = async function(catSlug="") {
	const qUrl = baseCatUrl +"?slug="+ catSlug,
	catId = await getRequest(qUrl)
	.then( cat => { return cat[0].id } );
	return catId;
}

getPostByCategory = async function(catSlug="",filter=""){
	const posts = await getCategoryId(catSlug)
		.then( catId => { 
			const qUrl = buildPostUrl('?_embed&categories[]='+catId+filter);
			const response =  getRequest(qUrl);
			return response;
		} )
	return posts;
}

getPostById = async function(id=""){
	const url = basePostUrl + '/' + id + '?_embed',
	post = await getRequest(url)
		.then(post=>{ return post; });
	return post;
}

getMediaBySlug = async function(qSlug=""){
	const qUrl = baseMediaUrl + "?slug=" + qSlug;
	media = await getRequest(qUrl)
		.then(response => { return response[0] });
	return media;
}
// end filter request funcs

getThreeClients = async function() {
	const clients = getPostByCategory('clients','&per_page=3');
	return clients;
}

getClients = async function() {
	const clients = getPostByCategory('clients');
	return clients;
}

getThreeReviews = async function() {
	const reviews = getPostByCategory('review','&per_page=3');
	return reviews;
}

getProjects = async function() {
	const projects = getPostByCategory('project');
	return projects;
}

getExperienceItems = async function() {
	const xp = getPostByCategory('experience','&per_page=3');
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
			console.log(media);
			return media.source_url;
		})
	return src;
}

// end request funcs

render = async function(target="", request = ()=>{return new Promise; }, markup = ()=>{return '';}) {

	await request()
		.then(items => {
			let inject = ``;

			for(let i in items) {
				console.log (items, items.length);
				inject += markup(items[i]);
			};

			document.querySelector(target).innerHTML = inject;

		}).catch(err=>console.log(err));
}

buildUrlArray = function(){
	let url = window.location.href;
	url = url.split("/")
	return url;
}

