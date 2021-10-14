import {PostType} from "@/types/posts.ts";

export const state = {
	posts: [ new PostType() ],
	post: [ new PostType() ],
}

export type State = typeof state
