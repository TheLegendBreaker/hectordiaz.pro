import { JSONPost, PostType} from "@/types/posts.ts";
import { createStore, Commit } from "vuex";

export default store createStore<State>({
	state: () => ( {
		posts: [],
		post: [new PostType()],
	} ),

	mutations: {
		setPosts (state:State, posts) {
			state.posts = posts;
		},

		setPost (state:State, post) {
			state.post = post;
		},

		setPostCategories (state:State, id:number, cats:['']) {
				state.posts.filter(( post:PostType ) => post.id === id).categories = [...cats];
		}

	},

	actions: {
		async reqPosts (state:State,commit:Commit) {
			// async func to get all posts from wp
			if (state.posts.length) return;

			try {
				const response = await fetch(`https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?page=1&per_page=20&_embed`)
					.then(res => res.json());

				const posts = response
					.filter(( el:JSONPost ) => el.status === "publish" )
					.map(function({id, slug,title,excerpt,date,tags,content,categories,_embedded}:JSONPost) {
						const post = new PostType();

						post.setId(id);
						post.setSlug(slug);
						post.setTitle(title.rendered);
						post.setExcerpt(excerpt.rendered);
						post.setDate(date);
						post.setTags(tags);
						post.setContent(content.rendered);
						post.setCategories(categories);
						if (_embedded['wp:featuredmedia'] !== undefined) {
							post.setFeatImg(_embedded['wp:featuredmedia'][0].source_url);
						}

						return post;
					})


				commit("setPosts", posts);

			} catch (err) {
				console.log(err);
			}
		},

		async reqPost (state:State, commit:Commit, id:number) {
			const qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?include[]=`+id+`&_embed`

			// async func to get all posts from wp
			try {
				let post = await fetch(qString)
					.then(res => res.json());

				post = post
					.filter(( el:JSONPost ) => el.status === "publish" )
					.map(function({id, slug,title,excerpt,date,tags,content,categories,_embedded}:JSONPost) {
						const post = new PostType();

						post.setId(id);
						post.setSlug(slug);
						post.setTitle(title.rendered);
						post.setExcerpt(excerpt.rendered);
						post.setDate(date);
						post.setTags(tags);
						post.setContent(content.rendered);
						post.setCategories(categories);
						if (_embedded['wp:featuredmedia'] !== undefined) {
							post.setFeatImg(_embedded['wp:featuredmedia'][0].source_url);
						}

						return post;
					})

				commit("setPost", post);

			} catch (err) {
				console.log(err);
			}
		},

		async reqCat (state:State, commit:Commit, id:number) {
			const qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/categories/`+id;
			console.log('reqCat triggered', qString)
			try {
				const cat = await fetch(qString)
					.then(res => res.json());
					return cat
			} catch (err) {
				console.log(err)
			}
		},
	},

  modules: {}, });
