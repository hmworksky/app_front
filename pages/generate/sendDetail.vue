<template name="generate">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :backPath="'/pages/generate/home'" :isBack="true"><block  slot="backText">返回</block><block slot="content">发送结果</block></cu-custom>
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
				<view class="cu-item" :class="detailObj.status -1 < index?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<!-- <text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}} -->
					<text class="num"  :data-index="index + 1"></text> {{item.name}}
					
				</view>
			</view>
		</view>


        <view>
            <view class="cu-timeline">
                <view class="cu-time">发送进度</view>

                <view v-for="(item, index) in detailObj.log" :key="index" class="cu-item cur cuIcon-noticefill">
                    <view  :class="item.status">
                        <text v-text="item.update_time + '    ' + item.memo"></text>
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
	import {getSendDetail} from '../../api/generate'
	let detailData = null
    const statusMap= {
        info: "content",
        success: "content bg-green shadow-blur",
        error: "content bg-red shadow-blur"
    }
	export default {
        created(){
			this.requestId = this.$route.query.requestId
			this.getDetailData()
		},

		data() {
			return {
                requestId: null,
				detailObj: {
					status: 0,
					device: null,
					send_type: null,
					env: null,
					log: [
						{
							"status": 1,
							"memo": "初始化完成",
							"update_time": this.getCurrentTime()
						}
					]
				},
				num: 0,
				scroll: 0,
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
				}, ],
				sendStatus: 0,
				times : 1
				}
				
				
			},
		methods:{
			back(){
				this.$router.push({'path': '/pages/generate/home'})
			},
			getCurrentTime(){
				let now = new Date();
				return now.toLocaleTimeString()
			},
			timer(){
				this.times = this.times +1
				console.log(this.times)
				if (this.times<10){
				return setTimeout(()=>{					
					this.getDetailData()
					console.log(this.detailObj)
					}, 3000)
				}
				
			},
			getSendStatus(){
				return this.detailObj.log[0].status - 1
			},
			getOut(){
				clearTimeout(this.timer)
			},
			getStatus(key){
				return statusMap[key]
			},



			getDetailData(){
				let param = {
					"request_id": this.requestId
				}
				getSendDetail(param).then(response=>{
					this.detailObj =  response
				}).catch(error => console.log(error))
			}
		},
		watch:{
			detailObj(){
				this.timer()
			},
			sendStatus(){
				console.log("hhh-1")
				console.log(this.sendStatus)
				this.sendStatus = this.detailObj["log"][0]["status"] - 1
			}
		},
		destroyed(){
			clearTimeout(this.timer)
		}

	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
