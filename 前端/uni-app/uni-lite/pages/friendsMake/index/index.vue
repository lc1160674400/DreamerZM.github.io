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
			<!-- 已身份的用户显示的内容	 -->
			<view v-if="hasLogin" class="hello">
			    <view class="uni-card" v-for="(item,index) in tabIndex==0?maleList:famaleList">
			    	<view class="uni-card-header uni-card-media">
			    		<image class="uni-card-media-logo" :src="item.headImg?item.headImg:'../../../static/img/person/person_default.png'"></image>
			    		<view class="uni-card-media-body">
			    			<text class="uni-card-media-text-top">{{item.name}}</text>
			    			<text class="uni-card-media-text-bottom">发表于 {{item.timestamp}}</text>
			    		</view>
			    	</view>
			    	<view class="uni-card-content image-view">
			    		<image :src="item.headImg?item.headImg:'../../../static/img/person/content_default.png'" class="image"></image>
			    	</view>
			    	<view class="uni-card-footer">
			    		<view class="uni-card-link">收藏</view>
			    		<view class="uni-card-link">获取联系</view>
			    		<view class="uni-card-link">更多信息</view>
			    	</view>
			    </view>
			</view>
			<!-- 未登陆身份的用户显示的内容	 -->
			<view v-if="!hasLogin" class="hello">
			    <view class="title">
			        您好 游客。
			    </view>
			    <view class="ul">
			        <view>这是 uni-app 带登录模板的示例App首页。</view>
			        <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			    </view>
			</view>
	</view>
</template>
<script>
	import uniDrawer from '../../../components/uni-drawer.vue';
	import uniIcon from '../../../components/uni-icon.vue';
	import {
	    mapState
	} from 'vuex'
	
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
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
				rightDrawerVisible: false,
				maleList:[
					{
						headImg:'../../../static/img/person/person.png',
						name:'张三',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'../../../static/img/person/person2.png',
						name:'李四',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'../../../static/img/person/person3.png',
						name:'王五',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'',
						name:'赵六',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headimg:'',
						name:'狗蛋',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					}
				],
				famaleList:[
					{
						headImg:'../../../static/img/person/famale1.png',
						name:'王祖贤',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'../../../static/img/person/famale2.png',
						name:'刘亦菲',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'../../../static/img/person/famale3.png',
						name:'范冰冰',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headImg:'../../../static/img/person/famale4.png',
						name:'杨超越',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					},
					{
						headimg:'../../../static/img/person/famale5.png',
						name:'安妮海瑟薇',
						timestamp:'2018-01-30 15:30',
						userid:'000001'
					}
				],
				
			}
		},
		onLoad: function() {
			
			if (!this.hasLogin) {
			        uni.showModal({
			            title: '未登录',
			            content: '您未登录，需要登录后才能继续',
			            /**
			             * 如果需要强制登录，不显示取消按钮
			             */
			            showCancel: !this.forcedLogin,
			            success: (res) => {
			                if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
			                    if (this.forcedLogin) {
			                        uni.reLaunch({
			                            url: '../../login/login'
			                        });
			                    } else {
			                        uni.navigateTo({
			                            url: '../../login/login'
			                        });
			                    }
			                }
			            }
			        });
			    }
			
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
				console.log(this.tabIndex);
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
	.uni-card{
		margin-top:50upx;
	}
	
	.page {
	    padding-top: 60upx; background: #efeff4;
	}
	
	.image-view {
	    height: 480upx;
	    overflow: hidden;
	}
	
	.image {
	    width: 100%;
	}
</style>
