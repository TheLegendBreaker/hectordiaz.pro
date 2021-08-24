<template>
	<header>
		<section>
			<div class="logo-crop">
				<img class="logo" alt="Hectordiaz.pro logo, a set of curel parentheses surrounding a dash" src="./assets/logo.png">
			</div>
			<div>
				<h2>
					Hector Diaz's
					<br>
					Make Blog
				</h2>
			</div>
		</section>
		<nav id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link> |
			<router-link to="/about">Contact</router-link> |
			<router-link to="/post/archive">Post Archive</router-link> |
			<router-link to="/post/archive">Web Dev Portfolio</router-link> |
			<router-link to="/post/archive">Resume</router-link>
		</nav>
	</header>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
	-webkit-mask: url(./assets/drawing.svg);
	filter: grayscale(1) contrast(1.3) brightness(.8) blur(1px);
	box-shadow: 10px 5px 5px black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

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

