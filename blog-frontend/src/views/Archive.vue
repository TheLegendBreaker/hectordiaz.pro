<template>
  <div class="single">
		<div class="post" v-for="post in posts" :key="post.id">
			<Excerpt 
				v-bind:post="post"
			/>
		</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Excerpt from "@/components/Excerpt.vue"; // @ is an alias to /src

@Options({
	data: function () {
		return {
			msg: this.$route.params.id + " " + this.$route.params.title,
		}
	},

	computed: {
		posts() {
			return this.$store.state.posts;
		}
	},

	created() {
		this.$store.dispatch("reqPosts");
	},


  components: {
    Excerpt,
  },
})
export default class Single extends Vue {}
</script>
