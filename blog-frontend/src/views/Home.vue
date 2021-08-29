<template>
  <div class="home container">
	<section class="welcome-wrapper">
		<div class="welcome">
			<div class="msg">
				<h1>
					All hail Kanedias,
					<br>
					The Master Maker
				</h1>
				<ul class="cat-menu">
					<h2> Categories </h2>
					<li> A bug I found </li>
					<li> A thing I made </li>
					<li> Some thoughts I had </li>
				</ul>
			</div>
		</div>

		<div class="featured-card-wrapper">
			<article v-if="featured" class="featured-card accent-border">
				<div class="header">
					<h2 class="feat-title">
						Wild Card Post: {{ featured.title.rendered }}
					</h2>
				</div>
				<figure class="cyb-rez">
					<img v-bind:src="featured.featImg">
				</figure>
				<div class="main" v-html="featured.excerpt.rendered">
				</div>
				<div class="ctas">
					<router-link :to="{ name: 'Post', params: { id: featured.id, title: featured.slug } }">Read More</router-link>
				</div>
			</article>
		</div>
	</section>

	<section id="recent-post-archive">
		<div class="container">
			<h2> Recent Post Archive </h2>
			<section class="side-bar">
				<h3> Side bar </h3>
				<ul class="menu accent-border">
					<h4 class="accent-border"> Site Navigation </h4>
					<li> <router-link to="/">Home</router-link> </li>
					<li> <router-link to="/about">About</router-link> </li>
					<li> <router-link to="/about">Contact</router-link> </li>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <router-link to="/post/archive">Web Dev Portfolio</router-link> </li>
					<li> <router-link to="/post/archive">Resume</router-link> </li>
				</ul>
				<ul class="menu accent-border">
					<h4 class="accent-border"> Blog Categories </h4>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <router-link to="/post/archive">Web Dev Portfolio</router-link> </li>
					<li> <router-link to="/post/archive">Resume</router-link> </li>
				</ul>
			</section>

			<section class="archive in-blk" v-if="posts">
				<h3> Recent Post Archive </h3>
				<div class="post"  v-for="post in posts" :key="post.id">
					<article class="excerpt-card sec-border">
					<div class="copy in-blk">
						<div class="header">
							<h4> {{ post.title.rendered }} </h4>
						</div>
						<div v-html="post.excerpt.rendered" class="body">
						</div>
						<div class="ctas">
							<router-link :to="{ name: 'Post', params: { id: post.id, title: post.slug } }">Read More</router-link>
						</div>
					</div>
					<figure v-if="post.featImg" class="cyb-rez-sec in-blk">
						<img v-bind:src="post.featImg">
					</figure>
					</article>
				</div>
			</section>
		</div>
	</section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Excerpt from "@/components/Excerpt.vue";

@Options({
	data: function () {
		return {
			msg: this.$route.params.id + " " + this.$route.params.title,
		}
	},

	computed: {
		posts() {
			return this.$store.state.posts;
		},

		featured: function() {
			return this.$store.state.posts[1];
		}
	},

	created() {
		this.$store.dispatch("reqPosts");
	},

  components: {
    Excerpt,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
	@use '../assets/variables.scss' as var;
	@use '../assets/util.scss';

	.home {
		section {
			padding: 0 10px;
		}
	}
	.welcome-wrapper {
		.featured-card-wrapper,
		.welcome {
			height: 100vh;
			max-height: 1200px;
			width: 50%;
			position: relative;
			display: inline-block;
		}
		h1 {
			font-size: 2em;
		}
		.msg{
			.cat-menu {
				padding: 0;
				margin: 0;
				list-style: none;
				h2 {
					font-size: 1em;
					margin: 10px 0;
				}
				li {
					font-size: .75em;
					padding: 5px 10px;
				}
			}
		}
		.featured-card,
		.msg {
		position: absolute;
		top: 50%;
		transform: translate(-50%,-50%);
		left: 50%;
		width: 75%;
		}

		.featured-card {
			width: 75%;
			height: 50%;
			max-height: 500px;
			p a {
				display: none;
			}
			.main,
			.ctas,
			.header {
				padding: 10px;
				}
			.header {
				.feat-title {
					margin: 0;
					font-size: 1em;
				}
			}
			figure{
				width: 100%;
				height: 200px;
				margin: 0;
				background: var.$grey;
			}
			.main {
				p {
					margin: 0;
				}
			}
			.ctas {
				position: absolute;
				left: 0;
				bottom: 10px;
				a {
					padding: 10px 20px;
					background: var.$sec_blue;
					color: var.$bg_black;
					text-decoration: none;
				}
			}
		}
	}

.side-bar {
	display: inline-block;
	width: 30%;
	text-align: center;
	 h4 {
		margin: 0;
		border-bottom: solid 1px var.$accent_red;
		padding: 10px;
	 }
	 ul {
		width: 200px;
		text-align: left;
		display: inline-block;
	 }
	 li {
		padding: 5px;
	 }
	 a {
		width: calc(100% - 30px);
		 &:hover {
			color: var.$bg_black;
			background-color: var.$sec_blue;
		 }
	 }
}

.archive {
	width: 70%;

	.excerpt-card {
		margin-bottom: 60px;
		width: 100%;
		height: 350px;
		padding: 10px;
		position: relative;
		h4 {
			margin: 0;
		}
		.copy {
			width: 60%;
			 .header {
				height: 20%;
				padding-bottom: 10px;
			 }
			 .body {
				padding: 30px 0;
				p { margin:0; }
				a { display: none; }
			 }
			 .ctas {
				position: absolute;
				bottom: 10px;
				left: 10px;
				a {
					text-decoration: none;
					padding: 10px 15px;
					background: var.$accent_red;
					color: var.$bg_black;
				}
			 }
		}
		figure {
			position: absolute;
			top: 0;
			right: 0;
			margin: 0;
			width: 40%;
			height: 100%;
			background-color: #fff;
			img {
				height: 100%;
				width: auto;
			}
		}
	}
}
</style>
