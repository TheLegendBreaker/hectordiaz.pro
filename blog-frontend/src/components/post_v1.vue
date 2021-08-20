<template>
	<div class="post">
    <h1>{{ msg }}</h1>
		<article class="post">
			<h3>
				<a :href="`/post/${this.$store.post.id}/${this.$store.post.slug}`">{{ this.$store.post.title.rendered }}</a>
			</h3>
			<div v-html="this.$store.post.content.rendered "></div>
		</article>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RawPost, PostType} from "@/types/posts.ts";

@Options({
  props: {
    msg: String,
		post: PostType,
  },

	computed: {
		getPost() {
			return this.$store.state.post;
		}
	},

	created() {
		this.$store.dispatch("reqPost", this.$route.params.id);
	},

})

export default class Post extends Vue {
  msg!: string;
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
