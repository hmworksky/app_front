<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :url="'/pages/ui/home'" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">页面详情</block>
			</cu-custom>
<!-- 			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 宫格列表
				</view>
			</view> -->
			<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<radio-group class="block" @change="Gridchange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in 3" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{index +3}} 列</view>
									<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="cu-list menu text-left solid-top">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">边框</text>
							</view>
							<view class="action">
								<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				
				<view class="cu-item" :url="'/pages/ui/page/' + item.name" @click="pathTo(item.name)" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" >
					<!-- <router-link :to="{path:'/pages/ui/app/'+item.name}"> -->
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.title}}</text>
					<!-- </router-link> -->
				</view>
			</view>


			

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 元素列表
				</view>
			</view>
			<view class="cu-list menu-avatar">
		
				
				<view class="cu-item "  v-for="(item, index) in pageList" :key=index @click="goToDetail(item.pageId)" >
					<view class="cu-avatar radius lg" :style="{backgroundImage:'url('+ item.imageUrl+')'}" >
						<view class="cu-tag badge" v-if="item.isNew">New</view>
					</view>
					<view class="content">
						<view class="text-pink">
							<view class="text-cut">{{item.title}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">{{item.memo}}</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
						<view class="cu-tag round bg-red sm" v-if="item.elementNum>0">{{item.elementNum}}</view>
					</view>
				</view>
				
				
				
			</view>
			

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				request: {},
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					name: 'add',
					title: '新增页面111'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 8,
					name: 'detail',
					title: '流程'
				}, {
					cuIcon: 'attentionfavor',
					color: 'green',
					badge: 122,
					name: 'detail',
					title: '场景'
				}, {
					cuIcon: 'peoplelist',
					color: 'blue',
					badge: 133,
					name: 'detail',
					title: '步骤'
				}, {
					cuIcon: 'full',
					color: 'yellow',
					badge: 12,
					name: 'detail',
					title: '元素'
				}
				
				],
				pageList: [
					{
						pageId: 1,
						title: '首页',
						memo: '手表-首页',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						isNew: true,
						createTime: '22:22',
						elementNum: 11
					},{
						pageId: 2,
						title: '个人中心',
						memo: '手表-个人中心页',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
						isNew: false,
						createTime: '21:21',
						elementNum: 0
					}
				],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		methods: {
			getImageUrl(name){
				return "background-image:url("+name+");"
			},
			pathTo(name){
                this.$router.push({path:'/pages/ui/page/'+name})
			},
			goToDetail(pageId){
				this.$router.push({path:'/pages/ui/page/detail', query:{pageId: pageId}})
			}

		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
