import { MutationTypes } from './mutationTypes'
import { PostType } from "@/types/posts.ts"
import { MutationTree } from 'vuex' 
import { State } from './state'

interface Qcat { id: number; cats: string[]; }

export type Mutations<S = State> = {
	[MutationTypes.setPost](state: S, payload: PostType[]):void
	[MutationTypes.setPosts](state: S, payload: PostType[]):void
	[MutationTypes.setPostCategories](state: S, payload: Qcat):void
}

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.setPost](state: State, payload: PostType[]) {
		state.post = payload
	},
	[MutationTypes.setPosts](state: State, payload: PostType[]) {
		state.posts = payload
	},
	[MutationTypes.setPostCategories](state: State, payload: Qcat) {
		state.posts.filter(( post:PostType ) => post.id === payload.id)[0].categories = [...payload.cats];
	},
}
