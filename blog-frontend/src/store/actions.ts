import { MutationTypes, ActionTypes, Mutations, State } from './'
import { JSONPost, PostType, JSONCat } from "@/types"
import { ActionTree, ActionContext } from "vuex"

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
	[ActionTypes.getPosts](
		{ commit }: AugmentedActionContext,
	): Promise<PostType[]>
	[ActionTypes.getPost](
		{ commit }: AugmentedActionContext,
		payload: number,
	): Promise<PostType[]>
	[ActionTypes.getPostCategorey](
		{ state, commit }: AugmentedActionContext,
		payload: number,
	): Promise<PostType[]>
}

export const actions: ActionTree<State, State> & Actions  = {
	[ActionTypes.getPosts]({commit}) {

			return  new Promise<PostType[]> (
				(resolve, reject) => {
					fetch(`https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?page=1&per_page=20&_embed`)
						.then(( res ) => res.json())
						.then((res ) => {
								const posts = res
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

							resolve(posts);
							}
						)
						.catch(err=> reject(new Error(err)))
				} )
	},

	[ActionTypes.getPost]({commit}, payload) {
		const qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?include[]=`+payload+`&_embed`

		return new Promise<PostType[]>(
			(resolve, reject)=>{
				fetch(qString)
				.then(res => res.json())
				.then((res)=>{
					const post = res
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
					return post;
				})
				.catch(err=> reject(new Error(err)))
				
		})
	},

	[ActionTypes.getPostCategorey]({state, commit}, payload) {
		if (state.posts.filter(( post:PostType ) => post.id === payload)) {
			const target = state.posts.filter(( post:PostType ) => post.id === payload),
			qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/categories/`+target[0].categories[0];
			console.log('reqCat triggered', qString);
			return new Promise<PostType[]> ( (resolve, reject)=>{
					fetch(qString)
					.then(( res ) => res.json())
					.then((res) => {
						const post=res
						commit( MutationTypes.setPostCategories, { id: payload, cats: [post[0].name], })
						resolve(post);
					})
				.catch(err=> reject(new Error(err)))
			})
		}
		return new Promise(( resolve )=> resolve([new PostType]));
	},
}
