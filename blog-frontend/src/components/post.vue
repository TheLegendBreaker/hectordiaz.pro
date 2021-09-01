<template>
	<article class="post">
		<div class="header">
			<h1> <a :href="`/post/${post.id}/${post.slug}`">{{ post.title.rendered }}</a> </h1>
		</div>
		<figure v-if="post.featImg" class="cyb-rez full-width pos-rel crop">
			<img v-bind:src="post.featImg" class="pos-abso center-y">
		</figure>
		<div class="body">
			<div v-html="post.content.rendered "></div>
		</div>
	</article>
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
	@use '@/assets/util.scss';

	#topbar section {
		height: unset;
	}

	.post {
		figure {
			height: 300px;
			img {
				width: 100%;
				height: auto;
				left: -40px;
			}
		}
		.body {
			padding: 50px 0;
		}
	}

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
