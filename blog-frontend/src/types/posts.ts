export class Rendered {
	private __name__ = "Rendered";

	rendered: string;
	protected?: boolean;

	constructor() {
		this.rendered = '';
		this.protected = false;
	};

	setRendered(rendered:string):void {
		this.rendered = rendered;
	}
	setProtected(status:boolean):void {
		this.protected = status;
	}
}
export class FeatMedia {
	private __name__ = "FeatMedia";

	id: number;
	date: string;
	source_url: string;

	constructor() {
		this.id = 0;
		this.date = '';
		this.source_url = '';
	}
}

export class Embedded {
	private __name__ = "Embedded";

	"wp:featuredmedia": FeatMedia[];
	constructor() {
		this["wp:featuredmedia"]= [new FeatMedia];
	}
}

export class JSONPost {
	private __name__ = "JSONPost";

	status: string;
	id: number;
	slug: string;
	date: string;
	title: Rendered;
	excerpt: Rendered;
	tags: string[];
	content: Rendered;
	categories: string[];
	_embedded: Embedded;

	constructor() {
		this.status = '';
		this.id = 0;
		this.slug = '';
		this.date = '';
		this.title = new Rendered();
		this.excerpt = new Rendered();
		this.tags = [''];
		this.content = new Rendered();
		this.categories = [''];
		this._embedded = new Embedded();
	}

}

export class PostType {
	private __name__ = "PostType";

	status: string;
	id: number;
	date: string;
	slug: string;
	title: Rendered;
	excerpt: Rendered;
	tags: string[];
	content: Rendered;
	categories: string[];
	featImg: string;

	// need to add an argument json:RawPost to give the constructor the ability to make the types match up.

	constructor() {
		this.status = '';
		this.id = 0;
		this.slug = '';
		this.date = '';
		this.title = new Rendered();
		this.excerpt = new Rendered();
		this.tags = [''];
		this.content = new Rendered();
		this.categories = [''];
		this.featImg = '';
	}

	setStatus(status:string):void {
		this.status = status;
	}

	setId(id:number):void {
		this.id = id;
	}

	setSlug(slug:string):void {
		this.slug = slug;
	}

	setDate(date:string):void {
		this.date = date;
	}

	setTags(tags:string[]):void {
		this.tags = tags;
	}

	setTitle(rendered:string,status=false):void {
		this.title.setRendered(rendered);
		this.title.setProtected(status);
	}

	setExcerpt(rendered:string,status=false):void {
		this.excerpt.setRendered(rendered);
		this.excerpt.setProtected(status);
	}

	setContent(rendered:string,status=false):void {
		this.content.setRendered(rendered);
		this.content.setProtected(status);
	}

	setCategories(cats:string[]):void {
		this.categories = cats;
	}

	setFeatImg(imgUrl:string):void {
		this.featImg = imgUrl;
	}
}
