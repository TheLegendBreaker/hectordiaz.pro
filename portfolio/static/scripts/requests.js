// url funcs

var baseUrl = 'https://api.hectordiaz.pro/portfolio/wp-json/wp/v2';
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

getClients = async function() {
	const clients = getPostByCategory('clients');
	return clients;
}

getProjects = async function() {
	const projects = getPostByCategory('project');
	return projects;
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
			console.log(media);
			return media.source_url;
		})
	return src;
}

// end request funcs

render = async function(target="", request = ()=>{return new Promise; }, markup = ()=>{return '';}) {
	// do something
	// request () get the data from wp through wp json api
	await request()
		.then(items => {
			let inject = ``;
			for(let i in items) {
				inject = markup(items[i]);
			};
			document.querySelector(target).innerHTML = inject;
		}).catch(err=>console.log(err));
	// markup() takes a json item from the request promise and builds markup for that time and returns a string.
}
