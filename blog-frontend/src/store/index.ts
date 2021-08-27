import { createStore } from "vuex";
import { JSONPost, PostType} from "@/types/posts.ts";

export default createStore({
	state: () => ( {
		posts: [],
		post: [new PostType()],
	} ),

	mutations: {
		setPosts (state, posts) {
			state.posts = posts;
		},

		setPost (state, post) {
			console.log(post)
			state.post = post;
			console.log(state.post)
		}
	},

	actions: {
		async reqPosts ({state,commit}) {
			// async func to get all posts from wp
			if (state.posts.length) return;

			try {
				const response = await fetch(`http://localhost:8000/wp-json/wp/v2/posts?page=1&per_page=20&_embed`)
					.then(res => res.json());
					console.log(response)


					// add _embedded.featuremedia[0].link
				const posts = response
					.filter(( el:JSONPost ) => el.status === "publish" )
					.map(function({id, slug,title,excerpt,date,tags,content,_embedded}:JSONPost) {
						const post = new PostType();
						console.log(_embedded['wp:featuredmedia']);

						post.setId(id);
						post.setSlug(slug);
						post.setTitle(title.rendered);
						post.setExcerpt(excerpt.rendered);
						post.setDate(date);
						post.setTags(tags);
						post.setContent(content.rendered);
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

		async reqPost ({state,commit}, id) {
			const qString = `http://localhost:8000/wp-json/wp/v2/posts?include[]=`+id
			console.log('reqPost triggered', qString)

			// async func to get all posts from wp
			try {
				let post = await fetch(qString)
					.then(res => res.json());

				post = post
					.filter(( el:JSONPost ) => el.status === "publish" )
					.map(function({id, slug,title,excerpt,date,tags,content}:JSONPost) {
						const post = new PostType();

						post.setId(id);
						post.setSlug(slug);
						post.setTitle(title.rendered);
						post.setExcerpt(excerpt.rendered);
						post.setDate(date);
						post.setTags(tags);
						post.setContent(content.rendered);

						return post;
					})

				commit("setPost", post);

			} catch (err) {
				console.log(err);
			}
		}
	},

  modules: {}, });
