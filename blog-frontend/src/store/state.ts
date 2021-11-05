import { PostType, Category } from "@/types"

export const state = {
	posts: [ new PostType() ],
	post: [ new PostType() ],
	categories: [ new Category() ],
}

export type State = typeof state
