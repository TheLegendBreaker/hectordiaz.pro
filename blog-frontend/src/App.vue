<template>
	<svg class="effects">
		<filter id="cyb-red" color-interpolation-filters="sRGB"
						x="0" y="0" height="100%" width="100%">
			<feColorMatrix type="matrix"
				values="0.87 0 0 0 0.00 
								0 0.20 0 0 0.00  
								0 0 0.20 0 0.00 
								0    0 0 1 0" />
		</filter>

		<filter id="cyb-blue" color-interpolation-filters="sRGB"
						x="0" y="0" height="100%" width="100%">
			<feColorMatrix type="matrix"
				values="0.63 0    0    0 0.00 
								0    0.70 0    0 0.00  
								0    0    0.81 0 0.00 
								0    0    0    1 0" />
		</filter>
	</svg>

	<header id="topbar">
	<div class="container">
		<section class="logo-card" >
			<div class="logo-crop">
			<img class="logo cyb-rez" alt="Hectordiaz.pro logo, a set of curel parentheses surrounding a dash" src="./assets/logo.png">
			</div>
			<div class="accent-border">
			<h2>
			Hector Diaz's
			<br>
			Make Blog
			</h2>
			</div>
		</section>

		<section>
			<h2>
			Navigation menu
			</h2>
			<nav id="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/about">Contact</router-link>
			<router-link to="/post/archive">Post Archive</router-link>
			<router-link to="/post/archive">Web Dev Portfolio</router-link>
			<router-link to="/post/archive">Resume</router-link>
			</nav>
		</section>
	</div>
	</header>

  <router-view />

	<footer class="pos-abso">
		<section>
			<div class="container">
				<h2> Footer </h2>
				<div class="in-blk crop round cyb-rez-sec"><img src="http://static.hectordiaz.pro/hector_diaz_web_developer_for_hire_in_boise.jpg" alt="a profile picture of Hector Diaz"></div>

				<div class="thanks in-blk">
					<p>
						Thanks for taking a look. Check back in as I am always making or doing something new.
						<br>
						<br>
						<br>
						Hopefully chat soon,
						<br>
						<br>
						<strong>
							Hector Diaz
							<br>
							Web Developer 1.
						</strong>
					</p>
				</div>

				<div class="ctas in-blk">
					<router-link to="/post/archive">View Hector's Linkedin profile</router-link>
					<router-link to="/post/archive">View Hector's make blog</router-link>
				</div>

				<div class="nav-container in-blk">
					<h3> Navigation menu </h3>
					<nav id="nav">
						<router-link to="/">Home</router-link>
						<router-link to="/about">About</router-link>
						<router-link to="/about">Contact</router-link>
						<router-link to="/post/archive">Post Archive</router-link>
						<router-link to="/post/archive">Web Dev Portfolio</router-link>
						<router-link to="/post/archive">Resume</router-link>
					</nav>
				</div>
			</div>

		</section>
	</footer>
</template>

<script lang="typescript">
	export default {
		computed: {
			posts() {
				return this.$store.state.posts;
			}
		},
		created() {
			this.$store.dispatch("reqPosts");
		}
	}
</script>

<style lang="scss">
@use "./assets/fonts/Blackwood-Castle/stylesheet.css" as blackwood;
@use "./assets/fonts/mont/stylesheet.css" as mont;
@use "./assets/variables.scss" as var;
@use "./assets/mixins.scss";

*{
	box-sizing: border-box;
	scroll-behavior: smooth;
	/*outline: dotted 1px aqua;*/
}
h1, h2 {
	font-family: blackwood_castle, "San Serif";
	font-weight: 500;
}

ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

body { 
	position: relative;
	margin: 0;
	background: #050a0b;
	&:before {
		content: '';
		background: radial-gradient(#1f272d, transparent);
		position: absolute;
		z-index: -1;
		top: 0px;
		left: 0px;
		bottom: -50px;
		right: 0px;
	}
}

#app {
  font-family: mont, courier, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var.$sec_blue;;
}

// util
svg.effects {
	position: absolute;
	z-index: -100;
}

article[class*=card]:hover {
	figure .fill-parent {
		opacity: 1;
		z-index: 10;
	}
}

[class*=cyb-rez].trans {
	& + .fill-parent {
		opacity: 1;
		z-index: 10;
	}
}

.cyb-rez-sec { filter: grayscale(1) contrast(1.8) brightness(1.5) blur(1px) url(#cyb-blue); }
.cyb-rez { filter: grayscale(1) contrast(1.8) brightness(1.5) blur(1px) url(#cyb-red); }
[class*=cyb-rez] {
	-webkit-mask: url(./assets/drawing.svg);
	box-shadow: 10px 5px 5px black;
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
	& + .fill-parent {
		transition: opacity .3s linear;
		opacity: 0;
		background-size: cover;
		background-position: center;
		top: 0;
		left: 0;
		z-index: 0
	}
	img {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
}

.accent-border {
	border: solid 1px var.$accent_red;
}
.sec-border {
	border: solid 1px var.$sec_blue;
}

.in-blk {
	display: inline-block;
	vertical-align: top;
}
.container {
	margin: 0 auto;
	max-width: 1200px;
	@include mixins.tablet {
		padding: 0 20px;
	}
}

// end util

#topbar {
	padding-top: 20px;
	position: relative;
	z-index: 100;
	@include mixins.tablet {
		padding: 0 20px;
	}
	section,
	#nav,
	.logo-crop,
	.logo-crop + div {
		display: inline-block;
		vertical-align: top;
		}
	section {
		width: 50%;
		height: 70px;
		& + section {
			text-align: right;
		}
		h2 {
			margin: 0;
			font-size: 1em;
			line-height: 1;
		}
	}
	.logo-card {
		.logo-crop {
			.logo {
				width: auto;
				height: 30px;
				@include mixins.tablet {
					height: 40px;
				}
			}
		}
		.logo-crop,
		h2 {
			padding: 10px;
		}
	}
}

#nav {
	max-width: 70px;
	text-align: left;
}

a {
	font-size: .75em;
	font-weight: bold;
	color: var.$sec_blue;
	padding: 10px 15px;
	display: inline-block;

	&.router-link-exact-active {
		color: #42b983;
		background: var.$accent_red;
		color: var.$bg_black;
	}
}

footer {
	padding: 20px;
	margin-top: 50px;
	width: 100vw;
	top: 100%;
	left: 0;
	border-top: solid 2px var.$accent_red;
	.crop {
		$d: 150px;
		width: $d;
		height: $d;
		margin-right: 40px;
		background-color: #fff;
		@include mixins.laptop {
			$d: 250px;
		}
	}
	.thanks {
		padding: 0 10px;
		width: 100%;
		@include mixins.tablet {
			width: calc(40% - 70px);
		}
	}
	.ctas {
		width: 100%;
		@include mixins.tablet {
			width: calc(25% - 70px);
		}
	}
	nav-container {
		@include mixins.tablet {
			width: calc(40% - 150px);
		}
	}
}
</style>

