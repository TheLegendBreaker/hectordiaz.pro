<template>
  <div class="single container">
		<section class="archive in-blk" v-if="posts.length">
			<h3> Recent Post Archive </h3>
			<div class="post"  v-for="post in posts" :key="post.id">
				<article class="excerpt-card sec-border" v-bind:class="post.categories[0].replace(/\s+/g, '-')">
				<div class="copy in-blk">
					<div class="header">
						<h4> {{ post.title.rendered }} </h4>
					</div>
					<small> categorey: {{post.categories[0]}} </small>
					<div v-html="post.excerpt.rendered" class="body">
					</div>
					<div class="ctas">
						<router-link :to="{ name: 'Post', params: { id: post.id, title: post.slug } }">Read More</router-link>
					</div>
				</div>
				<figure v-if="post.featImg" >
					<div class="cyb-rez-sec in-blk .crop">
						<img v-bind:src="post.featImg">
					</div>
					<div v-bind:style="{ 'background-image': 'url('+ post.featImg +')' }" class="fill-parent"></div>
				</figure>
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
			<section class=" center-y side-bar cat-filter">
				<h3> Filter Posts </h3>
				<ul class="menu accent-border">
					<h4 > Categories </h4>
					<div v-for="cat in categories" :key="cat.id">
						<li> <button v-on:click="filter(cat.name.replace(/\s+/g, '-'))" v-bind:class="cat.name.replace(/\s+/g, '-')">
							{{ cat.name }}</button> </li>
					</div>
				</ul>
			</section>

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
		categories() {
			return this.$store.getters.getChannelCategories;
		},
		posts() {
			const posts = this.$store.getters.getChannelPosts;
			return posts;
		},
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
		this.$store.dispatch(ActionTypes.getCategories);
	},

	mounted() {
		const filter = this.$route.params.activeFilter;
		if (filter) {
			this.filter(filter);
		}
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
	.single .archive {
		margin-top: 200px;
		min-height: 450px;
	}
	.active-filter .excerpt-card:not(.filter) {
		display: none;
	}
	.side-bar.cat-filter {
		position: fixed;
		z-index: 20;
	}
	.menu {
		button {
			border: 0;
			background: transparent;
			width: 100%;
			color: var.$sec_blue;
			text-align: left;
			&.filter {
				background: var.$sec_blue;
				color: var.$bg_black;
			}
		}
	}
</style>
