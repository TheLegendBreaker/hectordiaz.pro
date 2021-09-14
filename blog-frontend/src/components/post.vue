<template>
	<article class="post">
		<div class="header">
			<h1>{{ post.title.rendered }}</h1>
		</div>
		<figure class="pos-rel" v-if="post.featImg" >
		<div class="cyb-rez full-width center-x crop">
		<img v-bind:src="post.featImg" class="center-y">
		</div>
		<div v-bind:style="{ 'background-image': 'url('+ post.featImg +')' }" class="fill-parent"></div>
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

	updated() {
		const img = this.$el.querySelector('[class*=cyb-rez]')
		this.$nextTick( function() {
			 if( img.classList) {
				img.classList.add('trans')
			 }
			 else {
				console.log(img);
			 }
		 })
	}

})

export default class Post extends Vue {
	post!: PostType;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@use '@/assets/util.scss';
	@use '@/assets/mixins.scss';

	#topbar section {
		height: unset;
	}

	.post {
		h1 { @include mixins.tablet{ font-size: 3em; } }
		figure {
			height: 300px;
			.crop {
				height:100%;
			}
			img {
				width: 100%;
				height: auto;
				/*left: -40px;*/
			}
		}
		.body {
			padding: 50px 0;
		}
	}

[class*=cyb-rez].trans + .fill-parent {
	width: calc(100% - 60px);
	max-width: 90%;
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
