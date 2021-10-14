<template>
  <div class="single container">
		<section class="archive in-blk" v-if="posts.length">
			<h3> Recent Post Archive </h3>
			<div class="post"  v-for="post in posts" :key="post.id">
				<article class="excerpt-card sec-border">
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
			<section class=" center-y side-bar">
				<h3> Side bar <span class="sr-only">Menu</span></h3>
				<ul class="menu accent-border">
					<h4 > Site Navigation </h4>
					<li> <router-link to="/">Home</router-link> </li>
					<li> <router-link to="/about">About</router-link> </li>
					<li> <router-link to="/about">Contact</router-link> </li>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <a href="https://portfolio.hectordiaz.pro">Web Dev Portfolio</a> </li>
					<li> <a href="https://resume.hectordiaz.pro">Resume</a> </li>
				</ul>
				<ul class="menu accent-border">
					<h4 > Blog Categories </h4>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <router-link to="/post/archive">Web Dev Portfolio</router-link> </li>
					<li> <router-link to="/post/archive">Resume</router-link> </li>
				</ul>
			</section>

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

	methods: {
		filter: function(crit:string){
			const archive = document.querySelector('.archive');
			if( archive != null ){
				if ( archive.classList.contains('archive-filter') ){
					archive.classList.add('archive-filter');
					} else {
					archive.classList.remove('archive-filter');
					}
			}
			// sort through the post and add the class .filter to each that match the crit value
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
<style lang="scss">
.archive {
	margin-top: 150px;
}
.acitve-filter .excerpt-card:not(.filter){
	display: none;
}
</style>
