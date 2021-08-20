<template>
	<div class="post">
		<article class="post">
			<h1>
				<router-link :to="{ name: 'Post', params: { id: post.id, title: post.slug } }">{{ post.title.rendered }}</router-link>
			</h1>
			<div v-html="post.excerpt.rendered "></div>
			<router-link :to="{ name: 'Post', params: { id: post.id, title: post.slug } }">Read More</router-link>
		</article>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PostType} from "@/types/posts.ts";

@Options({
  props: {
		post: PostType,
  },

})

export default class Post extends Vue {
	post!: PostType;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
