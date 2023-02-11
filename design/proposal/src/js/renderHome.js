setSiteLabel("sms");

const getProducts = async ()=>{
	setCustomPostEnpoint("product");
	return getPosts()
}
const getEvents = async ()=>{
	setCustomPostEnpoint("event");
	return getPosts()
}

renderEventExcerpts = async function () {
	await getEvents().then((response)=>{
		const container = document.querySelector("#events .section__body");
		renderCards(response, container);
		removeLoadingUi("events");
	}).catch((e)=>{console.log(e)});
};

renderProductExcerpts = async function () {
	await getProducts().then((response)=>{
		const container = document.querySelector("#products .section__body");
		console.log(response);
		renderCards(response, container);
		removeLoadingUi("products");
	}).catch((e)=>{console.log(e)});
};

renderProductExcerpts();
renderEventExcerpts();
