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

	constructor() {
		this.status = '';
		this.id = 0;
		this.slug = '';
		this.date = '';
		this.title = new Rendered();
		this.excerpt = new Rendered();
		this.tags = [''];
		this.content = new Rendered();
	}

}

export class PostType {
	private __name__ = "Post";

	status: string;
	id: number;
	date: string;
	slug: string;
	title: Rendered;
	excerpt: Rendered;
	tags: string[];
	content: Rendered;

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
}
