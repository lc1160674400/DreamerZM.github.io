<template>
	<view>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in imgs">
					<img :src="item.image" alt="" class="carousel-img">
				</div>
				
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
			<!-- 如果需要滚动条 -->
			<div class="swiper-scrollbar"></div>
		</div>
	</view>
</template>

<script>
	import Swiper from '@/static/js/swiper.min.js'
	export default {
		data() {
			return {
			};
		},
		props:{
			imgs:{
				type:Array,
				default:[]
			}
		},
		mounted() {
			console.log(this.imgs);
			 var mySwiper = new Swiper ('.swiper-container', {
				direction: 'horizontal',
				loop: true,
				autoplay: true,
				autoplay: {
					disableOnInteraction: false // 触摸停止轮播 
				}
				
			  })  
			}
		
	}
</script>

<style scoped="">
	@import url("../static/css/swiper.min.css");
	.swiper-container {
		width: 100%;
		height: 200px;
	}
	.carousel-img{
		width: 100%;
		height: 100%;
	}
</style>
