<template name="generate">

	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/tabbar/generate.jpg" mode="widthFix" class="response"></image>
			<view class="nav-list">
				<navigator hover-class='none' :url="'/pages/generate/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				elements: [{
						title: '发送数据',
						name: 'send',
						color: 'purple',
						cuIcon: 'vipcard'
					},
					{
						title: '常用设备列表',
						name: 'deviceQr',
						color: 'mauve',
						cuIcon: 'formfill'
					},
					{
						title: '血氧',
						name: 'list',
						color: 'pink',
						cuIcon: 'list'
					},
					{
						title: '步数',
						name: 'card',
						color: 'brown',
						cuIcon: 'newsfill'
					},
					{
						title: 'SOS',
						name: 'form',
						color: 'red',
						cuIcon: 'formfill'
					},
					{
						title: '命令设置',
						name: 'timeline',
						color: 'orange',
						cuIcon: 'timefill'
					},
					{
						title: '聊天',
						name: 'chat',
						color: 'green',
						cuIcon: 'messagefill'
					},
					{
						title: '轮播',
						name: 'swiper',
						color: 'olive',
						cuIcon: 'album'
					},
					{
						title: '模态框',
						name: 'modal',
						color: 'grey',
						cuIcon: 'squarecheckfill'
					},
					{
						title: '步骤条',
						name: 'steps',
						color: 'cyan',
						cuIcon: 'roundcheckfill'
					}
				],
			};
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
