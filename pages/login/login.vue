<template name="login">
	<view>
		<cu-custom bgColor="login-bg-gradual-pink" :url="'/pages/generate/home'" :isBack="false" :back-path="'/pages/generate/home'">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<form>

        <view class="input-group">
        	<view class="input-row border">
        		<text class="title">账号：</text>
        		<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
        	</view>
        	<view class="input-row">
        		<text class="title">密码：</text>
        		<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
        	</view>
        </view>
        <view class="btn-row">
        	<button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>

		<button class="cu-btn block bg-blue margin-tb-sm lg" :url="'/pages/generate/' + sendTypeList[sendTypeIndex].key" @click="sendDataByData">开始发送</button>

		</form>
	</view>
</template>

<script>
    import {sendData} from '../../api/generate'
	import mInput from '../../components/m-input.vue'
	
	export default {
		components: {
			mInput
		},
        created(){
			this.getSendConf()
		},
		data() {
			return {
			    sendConf: {},
			    sendTypeIndex: 0,
                sendEnvIndex: 0,
				sendInterval: null,
				sendNumber: null,
                sendHeart: null,
                sendDevice: null,
                sendBloodPressure: {
			        low: null,
                    high: null,
                },
                sendBloodOxygen: null,
                sendTypeList: [
                    "心率",
                    "血压",
                    "血氧"
                ],
				sendTypeListMap: {
			        心率: "heart",
			        血压: "bloodPressure",
			        血氧: "bloodOxygen",

                },
			}

		},
		methods:{
            changeEnv(e) {
				this.sendEnvIndex = e.detail.value
			},
            PickerChange(e) {
				this.sendTypeIndex = e.detail.value
			},
			getSendConf() {
				// TODO
                this.sendConf = {
                    envList: ["测试-宝信", "测试-外高桥"]
                }
			},
            getSendValue(){
                return this.sendTypeListMap[this.sendTypeList[this.sendTypeIndex]]
            },
            checkSendValue(){
                if(this.sendDevice == null || this.sendDevice==""||this.sendDevice.length==0){
                    //TODO
                }
            },
            sendDataByData() {
				// TODO


                // 跳转页面
                const param = {
                    request_id: this.sendDevice + '_'+ Date.parse(new Date()),
                    device: this.sendDevice,
                    send_type: this.getSendValue(),
                    send_interval: this.sendInterval,
                    heart: this.sendHeart,
                    blood_oxygen: this.sendBloodPressure,
                    env: this.sendConf.envList[this.sendEnvIndex],
                    low_blood_pressure: this.sendBloodPressure.low,
                    high_blood_pressure: this.sendBloodPressure.high,

                }
                console.log(param.requestId)
                sendData(param).then(response=>{
                    console.log(response)
                }).catch(error => console.log(error))
                this.$router.push({path:'/pages/generate/sendDetail', query:{requestId: param.requestId}})
			},

		}

	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
