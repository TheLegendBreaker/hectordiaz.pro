<template>
  <div class="single container">
    <Post 
			v-bind:post="this.post[0]"
		/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Post from "@/components/post.vue"; // @ is an alias to /src
import { ActionTypes  } from "@/store";

@Options({
	computed: {
		post() {
			return this.$store.state.post;
		}
	},

	created() {
		this.$store.dispatch(ActionTypes.getPost, this.$route.params.id);
	},


  components: {
    Post,
  },
})
export default class Single extends Vue {}
</script>

<style lang="SCSS">

</style>
