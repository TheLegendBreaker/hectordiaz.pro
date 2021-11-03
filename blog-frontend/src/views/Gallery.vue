<template>
  <div class="single container">
		<section id="gallery" class="card-grid in-blk" v-if="posts.length">
			<h3> Art Gallery </h3>
			<div class="item in-blk"  v-for="post in posts" :key="post.id">
				<article class="card pos-rel sec-border" v-bind:class="post.categories[0].replace(/\s+/g, '-')">

					<figure class="pos-rel" v-if="post.featImg" >
						<div class="cyb-rez-sec in-blk crop">
							<img v-bind:src="post.featImg">
						</div>
						<div v-bind:style="{ 'background-image': 'url('+ post.featImg +')' }" class="fill-parent"></div>
					</figure>

					<div class="copy in-blk">
						<div class="header">
							<h4> {{ post.title.rendered }} </h4>
						</div>
						<div class="ctas">
							<router-link :to="{ name: 'Post', params: { id: post.id, title: post.slug } }">Read More</router-link>
						</div>
					</div>
				</article>
			</div>
		</section>

		<div v-else class="archive in-blk">
			<h3> Recent Post Archive </h3>
				<article class="loading-container excerpt-card sec-border">
					<h2>Loading</h2>
					<div class="loading">
					</div>
				</article>

				<article class="loading-container excerpt-card sec-border">
					<h2>Loading</h2>
					<div class="loading">
					</div>
				</article>

				<article class="loading-container excerpt-card sec-border">
					<h2>Loading</h2>
					<div class="loading">
					</div>
				</article>
		</div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ActionTypes  } from "@/store";
import Excerpt from "@/components/Excerpt.vue"; // @ is an alias to /src

@Options({
	data: function () {
		return {
			msg: this.$route.params.id + " " + this.$route.params.title,
		}
	},

	computed: {
		posts() {
			const posts = this.$store.getters.getGalleryPosts;
			console.log(posts, 'posts from gallery component');
			return posts;
		}
	},

	methods: {
		filter: function(crit:string){
			
			const archive = document.querySelector('.archive');
			if( archive !== null ){
				if ( !archive.classList.contains('active-filter') ){
					archive.classList.add('active-filter');
				}
			}
			const selectedPosts = document.querySelectorAll( '.' + crit );
			selectedPosts.forEach( (post) => { 
					if( post.classList.contains('filter') ){
							post.classList.remove('filter'); 
						} 
						else {
							post.classList.add('filter'); 
						}
			})
			if (document.querySelectorAll('.archive .filter').length === 0){
				if( archive !== null ){
						archive.classList.remove('active-filter');
					}
				}
		}

	},

	created() {
		this.$store.dispatch(ActionTypes.getPosts);
	},


  components: {
    Excerpt,
  },
})
export default class Single extends Vue {}
</script>
<style lang="scss">
	@use '../assets/variables.scss' as var;
	@use '../assets/util.scss';
	@use '../assets/mixins.scss';
	#gallery {
		margin-top: 200px;
		min-height: 450px;
	}
	.card-grid {
		.item {
			width: 100%;
			max-width: calc( 1200px * .33 );
			padding: 30px;
		 @include mixins.laptop{
				width: 32%;
			 }
			 figure {
				height: 300px;
			 }
			 .copy {
				padding: 15px;
			 }
		}
}
</style>
