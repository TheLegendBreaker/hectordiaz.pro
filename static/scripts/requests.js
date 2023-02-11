// url funcs

const baseUrl = "https://api.hectordiaz.pro",
	wpApiUrl = "wp-json/wp/v2/";

let endpointCatUrl, endpointMediaUrl, endpointPostUrl, siteLabel;

const setSiteLabel = (label) => {
	siteLabel = label;
	setEndpoints();
};

const buildUrl = (siteLabel) => {
	return `${baseUrl}/${siteLabel}/${wpApiUrl}`;
};

const setPostEndpoint = (endPoint)=>{
	const baseUrl = buildUrl(siteLabel);
	return baseUrl + endPoint+"/";
}

const setDefaultPostEndpoint = ()=>{
	endpointPostUrl = setPostEndpoint("posts");
}
const setCustomPostEndpoint = (endPoint)=>{
	endpointPostUrl = setPostEndpoint(endPoint);
}

const setEndpoints = () => {
	const baseUrl = buildUrl(siteLabel);
	endpointCatUrl = baseUrl + "categories/";
	endpointMediaUrl = baseUrl + "media/";
	setDefaultPostEndpoint();
};


buildPostUrl = function (query = "") {
	const qUrl = endpointPostUrl + query;
	return qUrl;
};

buildFilterUrl = function (filter = "", value = "") {
	const qUrl = buildPostUrl("?filter[" + filter + "]=" + value);
	return qUrl;
};

getCategoryId = async function (catSlug = "") {
	const qUrl = endpointCatUrl + "?slug=" + catSlug,
		catId = await getRequest(qUrl).then((cat) => {
			return cat[0].id;
		});
	return catId;
};

getPostByCategory = async function (catSlug = "", filter = "") {
	const posts = await getCategoryId(catSlug).then((catId) => {
		const qUrl = buildPostUrl("?_embed&categories[]=" + catId + filter);
		const response = getRequest(qUrl);
		return response;
	});
	return posts;
};

getPosts = async function () {
	const url = endpointPostUrl + "/?_embed",
		post = await getRequest(url).then((post) => {
			return post;
		});
	return post;
};

getPostById = async function (id = "") {
	const url = endpointPostUrl + id + "?_embed",
		post = await getRequest(url).then((post) => {
			return post;
		});
	return post;
};

getMediaBySlug = async function (qSlug = "") {
	const qUrl = endpointMediaUrl + "?slug=" + qSlug;
	media = await getRequest(qUrl).then((response) => {
		return response[0];
	});
	return media;
};
// end filter request funcs

getMediaSrcBySlug = async function (qSlug = "") {
	const src = await getMediaBySlug(qSlug).then((media) => {
		return media.source_url;
	});
	return src;
};

// end request funcs

render = async function (
	target = "",
	request = () => {
		return new Promise();
	},
	markup = () => {
		return "";
	}
) {
	await request()
		.then((items) => {
			let inject = ``;

			for (let i in items) {
				inject += markup(items[i]);
			}

			document.querySelector(target).innerHTML = inject;
		})
		.catch((err) => console.log(err));
};

buildUrlArray = function () {
	let url = window.location.href;
	url = url.split("/");
	return url;
};
