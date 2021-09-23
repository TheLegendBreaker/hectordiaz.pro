<template>
  <div id="home" class="home container">
	<section id="welcome" class="welcome-wrapper">
		<div  class="welcome">
			<div class="msg">
				<h1>
					If you can imagine it,
					<br>
					I can make it.
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
				<div class="truncate">
				</div>
				<div class="main" v-html="featured.excerpt.rendered">
				</div>
				<div class="ctas">
					<router-link :to="{ name: 'Post', params: { id: featured.id, title: featured.slug } }">Read More</router-link>
				</div>
			</article>
			<article v-else class="loading-container featured-card accent-border">
				<h2>Loading</h2>
				<div class="loading">
				</div>
			</article>
		</div>
	</section>

	<section id="recent-post-archive">
		<div class="container">
			<h2> Recent Post Archive </h2>

			<section class="side-bar">
				<h3> Side bar <span class="sr-only">Menu</span></h3>
				<ul class="menu accent-border">
					<h4 > Site Navigation </h4>
					<li> <router-link to="/">Home</router-link> </li>
					<li> <router-link to="/about">About</router-link> </li>
					<li> <router-link to="/about">Contact</router-link> </li>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <router-link to="/post/archive">Web Dev Portfolio</router-link> </li>
					<li> <router-link to="/post/archive">Resume</router-link> </li>
				</ul>
				<ul class="menu accent-border">
					<h4 > Blog Categories </h4>
					<li> <router-link to="/post/archive">Post Archive</router-link> </li>
					<li> <router-link to="/post/archive">Web Dev Portfolio</router-link> </li>
					<li> <router-link to="/post/archive">Resume</router-link> </li>
				</ul>
			</section>

			<section class="archive in-blk" v-if="posts.length">
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
	@use '../assets/mixins.scss';

	.home {
		section {
			padding: 0 10px;
		}
	}
	.welcome-wrapper {
		.welcome {
			height: 100vh;
		}
		.featured-card-wrapper {
			height: 800px;
		}
		.featured-card-wrapper,
		.welcome {
			max-height: 1200px;
			position: relative;
			display: inline-block;
			width: 100%;
			@include mixins.tablet {
				width: 50%;
				height: 100vh;
			}
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
		.featured-card {
			top:0;
			left: 50%;
			transform: translateX(-50%);

			@include mixins.tablet {
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.msg {
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.featured-card,
		.msg {
		position: absolute;
		width: 75%;
		}

		.featured-card {
			width: 75%;
			height: 100%;
			max-height: 700px;
			background: var.$bg_black;
			@include mixins.tablet {
				height: 50%;
				max-height: 500px;
			}
			p a {
				display: none;
			}
			.main{
				max-height: 40%;
				overflow: hidden;
				@include mixins.tablet {
					max-height: 20%;
				}
				&:before {
					content: '';
					background: linear-gradient(180deg, transparent, var.$bg_black);
					position: absolute;
					width: 100%;
					top: 50%;
					bottom: 19%;
					left: 0;
					z-index: 10;
				}
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
	width: 30%;
	text-align: center;
	display: none;
	@include mixins.tablet {
		display: inline-block;
	}
	 h4 {
		margin: 0;
		border-bottom: solid 1px var.$accent_red;
		padding: 10px;
	 }
	 ul {
		text-align: left;
		display: inline-block;

		@include mixins.laptop {
			width: 200px;
		}
	 }
	 li {
		padding: 5px;
	 }
	 a {
		width: 100%;
		 &:hover {
			color: var.$bg_black;
			background-color: var.$sec_blue;
		 }
	 }
}

.archive {
	width: 100%;
	@include mixins.tablet {
		width: 70%;
	}

	.excerpt-card {
		margin-bottom: 60px;
		width: 100%;
		padding: 10px;
		position: relative;
		background: var.$bg_black;
		@include mixins.tablet {
			height: 350px;
		}
		h4 {
			margin: 0;
		}
		.copy {
			width: 100%;
			margin-top: 250px;
			@include mixins.tablet {
				margin-top: unset;
				width: 60%;
			}
			 .header {
				height: 20%;
				padding-bottom: 10px;
			 }
			 .body {
				margin: 30px 0 45px;
				max-height: 200px;
				overflow: hidden;
				p { margin:0; }
				a { display: none; }
				&:before {
					content: '';
					background: linear-gradient(180deg, transparent, var.$bg_black);
					position: absolute;
					top: 50%;
					bottom: 45px;
					left: 0;
					z-index: 10;
					width: 100%;
					@include mixins.tablet {
						width: 60%;
					}
				}
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
			left: 0;
			@include mixins.tablet {
				right: 0;
				left: auto;
				height: 100%;
				width: 40%;
			}
			height: 250px;
			width: 100%;
			margin: 0;
			img {
				width: 100%;
				height: auto;
				@include mixins.tablet {
					height: 100%;
					width: auto;
				}
			}
		}
	}
}
@keyframes loading {
  0% {
		right: calc(( 1200px * .75 )* -1);
  }
  100% {
		right: 150%;
  }
}

.loading-container {
	overflow: hidden;
	position: relative;
	h2 {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		text-align: center;
		width: 100%;
	}
}
div.loading {
	animation: loading 2s infinite;
	background-image: linear-gradient(49deg, transparent 30%, #a1b3ce 35%, #a1b3ce 40%, transparent 60%);
	opacity: .45;
	z-index: 5;
	position: absolute;
	width: 150%;
	min-width: calc(1200px * .75);
	height: 150%;
	top: 0;
}
#welcome {
	div.loading {
		background-image: linear-gradient(69deg, transparent 30%, #dd3232 35%, #dd3232 40%, transparent 60%);
	}
	.loading-container h2 { color: #dd3232; }
}
</style>
