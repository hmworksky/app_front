<template name="generate">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :url="'/pages/generate/home'" :isBack="true" :back-path="'/pages/generate/home'">
			<block slot="backText">返回</block>
			<block slot="content">发送设置</block>
		</cu-custom>
		<form>

        <view  class="cu-form-group">
            <view class="title">设备号</view>
            <input placeholder="请输入发送的设备号" type="number" maxlength="15" name="input" v-model="sendDevice"></input>
        </view>

        <view class="cu-form-group margin-top">
			<view class="title">发送环境</view>
			<picker @change="changeEnv" :value="sendEnvIndex" :range="sendConf.envList">
				<view class="picker">
					{{sendConf.envList[sendEnvIndex]}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group margin-top">
			<view class="title">发送类型</view>
			<picker @change="PickerChange" :value="sendTypeIndex" :range="sendTypeList">
				<view class="picker">
					{{sendTypeList[sendTypeIndex]}}
				</view>
			</picker>
		</view>

        <view v-if="sendTypeIndex==0" class="cu-form-group">
			<view class="title">发送心率值</view>
			<input placeholder="请输入发送心率值" type="number" name="input" v-model="sendHeart"></input>
		</view>

        <view v-else-if="sendTypeIndex==1">
            <view  class="cu-form-group">
                <view class="title">发送低压值</view>
                <input placeholder="请输入发送低压值" type="number" name="input" v-model="sendBloodPressure.low"></input>
            </view>
            <view  class="cu-form-group">
                <view class="title">发送高压值</view>
                <input placeholder="请输入发送高压值" type="number" name="input" v-model="sendBloodPressure.high"></input>
            </view>
        </view>

        <view v-if="sendTypeIndex==2" class="cu-form-group">
			<view class="title">发送血氧值</view>
			<input placeholder="请输入发送血氧值" type="number" name="input" v-model="sendBloodOxygen"></input>
		</view>


		<view class="cu-form-group">
			<view class="title">发送数量</view>
			<input placeholder="请输入发送数量" type="number" name="input" v-model="sendNumber"></input>
		</view>

		<view class="cu-form-group">
			<view class="title">发送间隔</view>
			<input placeholder="请输入发送间隔(毫秒)" type="number" name="input" v-model="sendInterval"></input>
		</view>

		<button class="cu-btn block bg-blue margin-tb-sm lg" :url="'/pages/generate/' + sendTypeList[sendTypeIndex].key" @click="sendDataByData">开始发送</button>

		</form>
	</view>
</template>

<script>
    import {sendData} from '../../api/generate'

	export default {
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
			        血压: "blood_pressure",
			        血氧: "blood_oxygen",

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
			getEnvValue(){
				return this.sendConf.envList[this.sendEnvIndex]
			},
            sendDataByData() {
				// TODO


                // 构造请求参数
                const param = {
                    request_id: this.sendDevice + '_'+ Date.parse(new Date()),
					env: this.getEnvValue(),
                    device: this.sendDevice,
                    send_type: this.getSendValue(),
					send_count: this.sendNumber,
                    interval_time: this.sendInterval,
                    heart_value: this.sendHeart,
                    blood_oxygen_value: this.sendBloodOxygen,
                    env: this.sendConf.envList[this.sendEnvIndex],
                    diastolic: this.sendBloodPressure.low,
                    systolic: this.sendBloodPressure.high,

                }
                console.log(param)
                sendData(param).then(response=>{
                    console.log(response)
                }).catch(error => console.log(error))
                this.$router.push({path:'/pages/generate/sendDetail', query:{requestId: param.request_id}})
			},

		}

	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
