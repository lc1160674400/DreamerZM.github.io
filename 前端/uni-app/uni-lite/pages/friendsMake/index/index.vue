<template>
	<view class="uni-tab-bar">
		<!-- 头部切换tab -->
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- content -->
			<!-- 条件搜索 -->
			<view class="header">
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
					<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
				</view>
				<!-- #ifdef H5 -->
				<view class="icon" @click="showRightDrawer">
					<uni-icon type="bars" color="#666666" :size="22"></uni-icon>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="icon" @click="showRightDrawer">
					<uni-icon type="bars" color="#666666" :size="22"></uni-icon>
				</view>
				<!-- #endif -->
			</view>
			<!-- 右侧抽屉内容 -->
			<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
				<view style="padding:30upx;">
					<view class="uni-title">右侧滑出页面</view>
					<view class="uni-helllo-text">
						这是抽屉式导航组件使用示例，你可以在这里放置任何内容。关闭抽屉式导航有多种方式：</text>
						<text>\n1.点击本导航之外的任意位置；</text>
						<text>\n2.点击如下红色按钮；</text>
						<!-- #ifdef APP-PLUS -->
						<text>\n3.点击页面右上角的按钮；</text>
						<!-- #endif -->
					</view>
					<view class="uni-common-mt">
						<button class="button" type="warn" size="mini" @tap="closeRightDrawer">关闭抽屉式导航</button>
					</view>
					<view class="uni-list uni-common-mt">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right" @tap="item1">
								Item1
							</view>
						</view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right" @tap="item2">
								Item2
							</view>
						</view>
					</view>
				</view>
			</uni-drawer>
					
	</view>
</template>
<script>
	import uniDrawer from '../../../components/uni-drawer.vue';
	import uniIcon from '../../../components/uni-icon.vue';
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				// 头部tab栏
				tabBars: [{
					name: '男孩信息',
					id: 'male'
				}, {
					name: '女孩信息',
					id: 'famale'
				}],
				rightDrawerVisible: false
			}
		},
		onLoad: function() {
			
		},
		methods: {
			
			
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			item1() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item1'
				});
			},
			item2() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item2'
				});
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		}
	}
</script>

<style>
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}
	/* #endif */
	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}
	
	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}
	
	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}
	
	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
</style>
