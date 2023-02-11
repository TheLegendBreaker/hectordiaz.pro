// render funcs

setSiteLabel("sms");

const parseImgSrc = (data) => {
	return data._embedded["wp:featuredmedia"][0].source_url;
};


const parseImgSlug = (data) => {
	return data._embedded["wp:featuredmedia"][0].slug;
};

const setContentHtml = (data, param) => {
	return `
			<div class="card__summary">
				<div class="card__summary-content">
					${data.content.rendered}
				</div>
				<div class="card__cta-box card__cta-box--hidden">
					<a href="/clients/${data.id}" class="card__cta-btn">
						Read more.
					</a>
					<a href="/cardImg?${param}" class="card__view-cardImg-btn">
						View mock up.
					</a>
				</div>
			</div>
			`;
};


const prefix = "card__";
const setCardCaption = (data) => {
	const address = document.createElement("address"),
		caption = document.createElement("figcaption"),
		time = document.createElement("p"),
		day = document.createElement("p"),
		end = document.createElement("p");

	time.innerHTML = `<span class="card__caption-label">Time: </span>${data.meta.Start} to ${data.meta.End}`;
	address.innerHTML = `<span class="card__caption-label">Address: </span>${data.meta.Address}`;
	day.innerHTML = `<span class="card__caption-label">Date: </span>${data.meta.Day}`;

	address.className = prefix + "caption-address";
	time.className = prefix + "caption-time";
	day.className = prefix + "caption-day";
	caption.className = prefix + "caption";

	caption.append(day);
	caption.append(time);
	caption.append(address);
	return caption;
};


const setCardFigureBtn = () =>{
	const btn = document.createElement("button");
	btn.className = prefix + "figure-enlarge-flyer";
	btn.innerHTML = `<span class="${prefix}figure-enlarge-flyer-label">Enlarge event poster flyer</span>`;
	return btn; 
};


const setCardFigure = (data) => {
	const figure = document.createElement("figure"),
		caption = setCardCaption(data),
		btn = setCardFigureBtn();
	figure.className = prefix + "figure";
	figure.append(caption);
	figure.append(btn);
	return figure;
};


const setCardImg = () => {
	const cardImg = document.createElement("img");
	cardImg.className = prefix + "figure-img";
	return cardImg;
};


const setCardArticle = () => {
	const card = document.createElement("article");
	card.className = "card";
	return card;
};


const setCardTitle = (data) => {
	const title = document.createElement("h4");
	title.className = prefix + "title";
	title.innerHTML = data.title.rendered;
	return title;
};

const setCard = (data) => {
	const content = setContentHtml(data),
		figure = setCardFigure(data),
		title = setCardTitle(data),
		card = setCardArticle(),
		cardImg = setCardImg();

	card.innerHTML = content;
	figure.append(cardImg);
	card.prepend(figure);
	card.prepend(title);

	return card;
};


const setImgOnloadGetCard = (cardImg, card) => {
	cardImg.onload = () => {
		return card;
	};

};


const getCardImg = (card) => {
	return card.querySelector(".card__figure-img");
};

const getImgOnloadGetCard = (data) => {
	const card = setCard(data);

	const cardImg = getCardImg(card);

	setImgOnloadGetCard(cardImg, card);

	return cardImg;
};

const removeLoadingUi = (cssId) => {
	document.getElementById(cssId).classList.remove("section--loading");
};

const renderCards = (items, container) => {
	let imgSrc = "",
		param = "";

	container.innerHTML = "";

	for (const i in items) {
		const cardImg = getImgOnloadGetCard(items[i]),
			card = cardImg.onload();

		cardImg.onload = () => {
			container.append(card);
		};

		if (items[i]._embedded["wp:featuredmedia"]) {
			imgSrc = parseImgSrc(items[i]);
			param = parseImgSlug(items[i]);
		}
		cardImg.src = imgSrc;
	}
};

renderFolioClientsExcerpt = async function () {
	await getThreeClients()
		.then((items) => {
			const container = document.querySelector("#folio .section__clients-body");
			removeLoadingUi(container);
			renderCards(items, container);
		})
		.catch((err) => console.log(err));
};

renderFolioReviewExcerpts = async function () {
	await getThreeReviews()
		.then((items) => {
			const container = document.querySelector(
				"#folio .section__projects-body"
			);
			renderCards(items, container);
		})
		.catch((err) => console.log(err));
};

renderFolioProjectsExcerpt = async function () {
	// Add open single as modal eventlistener call back.
	await getProjects()
		.then((items) => {
			const container = document.querySelector(
				"#folio .section__projects-body"
			);
			renderCards(items, container);
		})
		.catch((err) => console.log(err));
};

renderXpItems = async function () {
	await getExperienceItems().then((items) => {
		card = "";
		if (items != undefined) {
			for (const i in items) {
				if (items[i].categories.length <= 1) {
					card =
						`
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
			document.querySelector("#xp div.xp-container").innerHTML = card;
		}
	});
};

renderStack = async function () {
	await getStackOfChoice().then((stack) => {
		if (stack != undefined) {
			const card = `
					<div class="card-container ">
					<article class="card">
					<div class="main">
					${stack[0].content.rendered}
					</div>
					</article>
					</div>
					`;

			document.querySelector("#stack div.container").innerHTML = card;
		}
	});
};

// end render funcs
// page actions

let target, lastTarget;

scrollActions = function () {
	const navLinks = document.querySelectorAll(".section__nav-link"),
		scrollPosition = window.scrollY,
		length = navLinks.length;

	if (scrollPosition > 300) {
		if (target !== length - 1) target = length - 1;
		else return;
	} else if (scrollPosition > 200) {
		if (target !== length - 2) target = length - 2;
		else return;
	} else if (scrollPosition > 100) {
		if (target !== length - 3) target = length - 3;
		else return;
	}
	navLinks.forEach((link, i) => {
		if (i === target) link.classList.add("section__nav-link--selected");
		else link.classList.remove("section__nav-link--selected");
	});
	lastTarget = target;
};

//addEventListener("scroll", scrollActions);
// end page actions
// invoke

//renderFolioClientsExcerpt();
//renderFolioProjectsExcerpt();

//renderFolioReviewExcerpts();
//renderXpItems();
//renderStack();

docReady(() => {
	document
		.querySelector(".section__about-logo")
		.classList.add("section__about-logo--fade-up");
});

// end invoke
