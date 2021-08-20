<template>
	<div class="post">
		<article class="post">
			<h1>
				<a :href="`/post/${post.id}/${post.slug}`">{{ post.title.rendered }}</a>
			</h1>
			<div v-html="post.content.rendered "></div>
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
