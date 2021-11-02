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
	[ActionTypes.getPostByCategorey](
		{ commit }: AugmentedActionContext,
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
								console.log(res);
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
									if (_embedded['wp:term'] !== undefined) {
										post.setCategories([_embedded['wp:term'][0][0].name]);
									}

									return post;
								})
							commit(MutationTypes.setPosts, posts);

							console.log(posts);
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

	[ActionTypes.getPostByCategorey]({ commit }, payload) {
		const qString = `https://api.hectordiaz.pro/share/wp-json/wp/v2/posts?include[]=`+payload+`&_embed`

		return new Promise<PostType[]>(
			(resolve, reject)=>{
				fetch(qString)
				.then(res => res.json())
				.then((res)=>{
					const post = res
					.filter(( el:JSONPost ) => { el.status === "publish" } )
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
}
