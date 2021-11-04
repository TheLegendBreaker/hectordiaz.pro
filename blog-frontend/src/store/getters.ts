import { PostType } from "@/types"
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
	getGalleryPosts(state: State): PostType[],
	getChannelPosts(state: State): PostType[],
}

export const getters: GetterTree<State, State> & Getters = {
	getGalleryPosts: (state) => {
		return state.posts.filter(post => post.categories[0]==='Portfolio');
	},
	getChannelPosts: (state) => {
		return state.posts.filter(post => post.categories[0]!=='Portfolio' && post.categories[0]!=='disabled');
	},
}
