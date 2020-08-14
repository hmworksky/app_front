<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">卡片</block></cu-custom>
<!-- 		<view class="cu-bar bg-white solid-bottom">
 -->
	
		<view class="cu-card article" :class="isCard?'no-card':''" v-for="(item, index) in deviceList" :key=index>
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut"></view>{{item.memo}}</view>
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> 
							{{item.mobile}}
							{{item.uid}}
							{{item.pid}}
						</view>
						<view>
							<view class="cu-tag bg-green light sm round">序号：{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false,
				deviceList: [
					{
						mobile: '13803001002',
						uid: '2238151228360209',
						pid: '2238151228360301',
						memo: '已绑定未建模',
						deviceSn: '888855095018888'
					},
					{
						mobile: '13803001003',
						uid: '2238151228360209',
						pid: '2238151228360301',
						memo: '已绑定已建模数据不足',
						deviceSn: '888855095018888'
					}
				]
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			getQrURL(device){
				return 'https://www.test.pajk.cn/health-center/down.html?imei=' + device + '#/'
				
			}
		}
	}
</script>

<style>

</style>
