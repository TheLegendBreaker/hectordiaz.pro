import { createStore, Store as VuexStore, CommitOptions, DispatchOptions, } from 'vuex'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'
import { Getters, getters } from './getters'
import { State, state } from './state'

export const store = createStore<State>({
  state,
	getters,
  mutations,
  actions,
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[2],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
	getters: {
		[K in keyof Getters] : ReturnType<Getters[K]>
	}
}
