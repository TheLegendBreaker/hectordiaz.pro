import { MutationTypes } from './mutationTypes'
import { PostType, Category } from "@/types/"
import { MutationTree } from 'vuex' 
import { State } from './state'

interface Qcat { id: number; cats: string[]; }

export type Mutations<S = State> = {
	[MutationTypes.setPost](state: S, payload: PostType[]):void
	[MutationTypes.setPosts](state: S, payload: PostType[]):void
	[MutationTypes.setCategories](state: S, payload: Category[]):void
}

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.setPost](state: State, payload: PostType[]) {
		state.post = payload
	},
	[MutationTypes.setPosts](state: State, payload: PostType[]) {
		state.posts = payload
	},
	[MutationTypes.setCategories](state: State, payload: Category[]) {
		state.categories = payload
	},
}
