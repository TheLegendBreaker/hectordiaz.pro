<template>
  <section id="split-hero" class="split-hero container">
		<div  class="first-half in-blk">
			<div v-html="firstHalf" class="half center-xy">
			</div>
		</div>

		<div class="second-half in-blk">
			<div v-html="secondHalf" class="half center-xy">
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props : {
		firstHalf: '',
		secondHalf: '',
	},
})
export default class SplitHero extends Vue {
	firstHalf!: string;
	secondHalf!: string;
}
</script>

<style lang="scss">
	@use '../assets/variables.scss' as var;
	@use '../assets/mixins.scss';

	#split-hero {
		.first-half,
		.second-half {
			height: calc(100vh - 70px);
		}
		.first-half,
		.second-half {
			max-height: 1200px;
			position: relative;
			width: 100%;
			@include mixins.tablet {
				width: 50%;
			}
		}
		.half {
			width: 75%;
		}

	}


</style>
