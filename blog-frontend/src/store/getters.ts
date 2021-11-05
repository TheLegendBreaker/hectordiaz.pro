import { PostType, Category } from "@/types"
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
	getGalleryPosts(state: State): PostType[],
	getChannelPosts(state: State): PostType[],
	getRandomChannelPost(state: State): PostType,
	getChannelCategories(state: State): Category[],
}

export const getters: GetterTree<State, State> & Getters = {
	getGalleryPosts: (state) => {
		return state.posts.filter(post => post.categories[0]==='Portfolio');
	},
	getChannelPosts: (state) => {
		return state.posts.filter(post => post.categories[0]!=='Portfolio' && post.categories[0]!=='disabled');
	},
	getRandomChannelPost: (state) => {
		const channel=  state.posts.filter(post => post.categories[0]!=='Portfolio' && post.categories[0]!=='disabled');
		const selection = Math.floor(Math.random() * channel.length );
		console.log(selection);
		return channel[selection];
	},
	getChannelCategories: (state) => {
		return state.categories.filter(cat => cat.name!=='template' && cat.name!=='Portfolio' && cat.name!=='disabled');
	},
}
