<template>
	<view class="content">
        <carousel-imgs :imgs="carouselImges"></carousel-imgs>
	</view>
</template>

<script>
	import api from '@/common/js/api.js'
    import CarouselImgs from '@/components/carousel-imgs.vue'
	export default {
		components: {
			CarouselImgs,
		},
		data() {
			return {
				areacode:'430124121001',
				carouselImges:[]
			}
		},
		onLoad() {
			this.getCarouselImages()
		},
		methods: {
			getCarouselImages:function(){
				api.shangwu.judge_rule_list({
					areacode: this.areacode,
					website: 'cunlifx',
					channel: 'slider',
					column: 'chazhoubianlunbuotu'
				})
				.then((res)=>{
					this.carouselImges =  res.data.adverts.length == 0?[]:res.data.adverts;
					console.log(this.carouselImges);
				})
			},

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
