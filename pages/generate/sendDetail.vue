<template name="generate">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :url="'/pages/generate/home'" :isBack="true"><block slot="backText">返回</block><block slot="content">心率发送</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 发送状态
			</view>
			<!--<view class="action">-->
				<!--<button class="cu-btn bg-green shadow" @tap="NumSteps">下一步</button>-->
			<!--</view>-->
		</view>

		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>


        <view>
            <view class="cu-timeline">
                <view class="cu-time">发送进度</view>

                <view v-for="(item, index) in sendProgress" :key="index" class="cu-item cur cuIcon-noticefill">
                    <view  :class="item.status">
                        <text v-text="item.time + '    ' + item.message"></text>
                    </view>
                </view>

            </view>
        </view>

		<!--<view class="padding">-->
            <!--<button v-if = "sendStatus==0" class="cu-btn block bg-blue margin-tb-sm lg" >开始发送</button>-->
            <!--<button v-else-if="sendStatus==1" class="cu-btn block line-blue margin-tb-sm lg" disabled>发送中</button>-->
		<!--</view>-->

	</view>
</template>

<script>
    const statusMap= {
        info: "content",
        success: "content bg-green shadow-blur",
        error: "content bg-red shadow-blur"
    }
	export default {
        created(){
			this.requestId = this.$route.query.requestId
            console.log(this.requestId)
		},
		data() {
			return {
                requestId: null,
				num: 0,
				scroll: 0,
				sendStatus: 0,
                sendProgress: [
                    {
                        time: "13:01",
                        status: this.getStatus("info"),
                        message: "准备开始发送"
                    },
                    {
                        time: "13:02",
                        status: this.getStatus("success"),
                        message: "已连接服务器"
                    },
                    {
                        time: "13:03",
                        status: this.getStatus("error"),
                        message: "服务器断开连接"
                    }
                ],
				numList: [{
					name: '连接'
				}, {
					name: '认证'
				}, {
					name: '发送'
				}, {
					name: '完成'
				}, ]
				}
			},
		methods:{
			NumSteps() {
				this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
            getStatus(status){
                return statusMap[status];
            },
			changeStatus(){
				//
				// this.sendStatus =
			}
		}

	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
