import { MutationTypes, ActionTypes, Mutations, State } from './'
import { JSONPost, PostType} from "@/types/posts.ts"
import { ActionTree, ActionContext } from "vuex"

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
	[ActionTypes.getPosts](
		state: State,
		{ commit }: AugmentedActionContext,
	): Promise<PostType[]>
	[ActionTypes.getPost](
		state:State,
		{ commit }: AugmentedActionContext,
		payload: number,
	): Promise<PostType[]>
	[ActionTypes.getPostCategorey](
		state:State,
		{ commit }: AugmentedActionContext,
		payload: number,
	): Promise<PostType[]>
}

export const actions: ActionTree<State, State> & Actions  ={
	[ActionTypes.getPosts](state,{commit}) {

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


				commit(MutationTypes.setPosts, posts);

				return posts;

			} catch (err) {
				console.log(err);
			}
	}
	[ActionTypes.getPost](state, {commit}, payload) {
		const qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?include[]=`+payload+`&_embed`

		// async func to get all posts from wp
		try {
			const json = await fetch(qString)
				.then(res => res.json());

			const post = json
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

			commit(MutationTypes.setPost, post);
			return json;

		} catch (err) {
			console.log(err);
		}
	}

	[ActionTypes.getPostCategorey](state, {commit}, payload) {
		if (state.posts.filter(( post:PostType ) => post.id === payload)) {
				const target = state.posts.filter(( post:PostType ) => post.id === payload),
				qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/categories/`+target[0].categories[0];
					console.log('reqCat triggered', qString)
					const json = await fetch(qString): Promise<PostType[]>
					.then(res => res.json())
					.then((cat:CatJson)=> {
						commit( MutationTypes.setPostCategories, { id: payload, cats: [cat.name], })
						})
					 .catch ( ( err:string ) => { console.log(err) })			
					return json;
		}
	},
}
