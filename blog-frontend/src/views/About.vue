<template>
  <div class="about">
    <SplitHero 
			v-bind:firstHalf="this.firstHalf()"
			v-bind:secondHalf="this.secondHalf()"
		/>
		<section id="about-author" class="pos-rel">
		<div class="container">
			<div class="center-x cyb-rez crop round">
				<img src="https://static.hectordiaz.pro/hector_diaz_web_developer_for_hire_in_boise.jpg" alt="hectordiaz.pro logo, a set of curel parenthese surrounding a dash">
			</div>
			<div class="body">
					<h2> About Hector</h2>
					<p>
						If you can imagine it, I can make it. 
						<br>
						<br>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</div>
		</section>
		<section id="contact">
			<div class="container sec-border">
				<h2> Contact </h2>
				<div class="content">
					<div class="contact-form in-blk">
					</div>
					<div class="in-blk send-an-email">
					<p>Or send me an email and we'll set up a time to meet.</p><a href="mailto: diazghector87203@gmail.com" target="_blank">hector@hectordiaz.pro</a>
					</div>
				</div>
			</div>
		</section>
  </div>
</template>
<script lang="ts">
	import SplitHero from "@/components/Split-Hero.vue";
	import { Options, Vue } from "vue-class-component";

	@Options ({
		methods: {
			contactScriptLoader():void {
			const src = "https://static.hectordiaz.pro/contactForm.js";

				if (document) {
						const script = document.createElement('script')
						script.setAttribute('src', src)
						document.head.appendChild(script)
						}else{
						console.log('else triggered')
						}
			},

			secondHalf():string { 
				return  `
					<img class="cyb-rez" src="https://static.hectordiaz.pro/logo.png" alt="Hectordiaz.pro logo, a set of curel parenthese surrounding a dash">
					` ; 
			},

			firstHalf():string { 
				return  `
					<h1> About this blog </h1>
					<p>My thanks for stopping by!
						<br>
						<br>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						<br>
						<br>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					<p/>
				`; 
			},
		},

		created: function(){
				this.contactScriptLoader();
			},

		components: {
			SplitHero,
		},
	})
export default class About extends Vue {}
	</script>
<style lang="scss">
	@use '../assets/variables.scss' as var;
	@use '../assets/mixins.scss';

	#split-hero .first-half {
		height: 160vh;
		max-width: 85%;
		max-height: unset;
		@include mixins.smart-phone {
			height: calc(100vh - 70px);
			max-width: unset;
			max-height: 1200px;;
		}
	}
	.second-half{ 
		display: none;
	 @include mixins.tablet {
			display: inline-block;
	 }
	}

	#about-author {
		$d:300px;
		padding-top: $d;
		.crop { 
			top: 0;
			height: $d;
			width: $d;
		}
	}

	img { 
		width: 100%; 
		height: auto;
			&.cyb-rez {
				max-width: 300px;
		}
	}

#contact {
	padding-top: 50px;
	.container {
		padding: 0 10px 30px 10px;
	}
	.content> * {
		padding: 0 10px;
		@include mixins.tablet{ width: 50%; }
	}
	form {
		&>*{display: block;}
		input { 
			width: 100%;
			max-width: 300px;
		}
		button {
			margin-top: 15px;
			padding: 15px 20px;
			width: 70px;
			background: var.$sec_blue;
			color: var.$bg_black;
			border: none;
			transition: all .3s ease;
							&.error {
				background: var.$error_red;
							}
							&.success {
				background: var.$success_grn;
							}
		}
	}
	.send-an-email {
		a {
			padding-left: 0;
		}
	}
}
html body .pulse {
  box-shadow: 0 0 0 0 #3b55b3;
  transform: scale(1);
  animation: pulse 2s infinite;
}

html body .pulse.waiting {
  background: #3b55b3;
	filter: grayscale(1);
  color: #fff;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 85, 179, 0.7);
    transform: scale(0.95);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 85, 179, 0);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 85, 179, 0);
    transform: scale(0.95);
  }
}
</style>
