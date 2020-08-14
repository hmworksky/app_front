<template name="ui">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :url="'/pages/ui/app/home'" :isBack="true" :back-path="'/pages/ui/app/home'">
			<block slot="backText">返回</block>
			<block slot="content">添加APP</block>
		</cu-custom>
		<form>

        <view  class="cu-form-group">
            <view class="title">App名称</view>
            <input placeholder="请输入APP名称" maxlength="15" name="input" v-model="appName"></input>
        </view>
		

        <view  class="cu-form-group">
			<view class="title">App包名</view>
			<input placeholder="请输入包名" type="number" name="input" v-model="packageName"></input>
		</view>
		
		<view class="cu-form-group-add margin-top" >
			<textarea maxlength="-1"  @input="textareaAInput" placeholder="请输入App说明" v-model="memo"></textarea>
		</view>

		<button class="cu-btn block bg-blue margin-tb-sm lg" :url="'/pages/ui/app/home'" @click="addAppData">添加</button>

		</form>
	</view>
</template>

<script>
    import {addApp} from '../../../api/ui'

	export default {

		data() {
			return {
				textareaAValue: '',
				appName: null,
				packageName: null,
				memo: null,

			}

		},
		methods:{
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
            addAppData() {
				// TODO


                // 构造请求参数
                const data = {
                    app_name: this.appName,
					package_name: this.packageName,
					memo: this.memo

                }
                addApp(data).then(response=>{
                    console.log(response)
                }).catch(error => console.log(error))
                this.$router.push({path:'/pages/ui/app/home'})
			},

		}

	}
</script>

<style>
	.page {
		height: 100vh;
	},
	
	.cu-form-group-add {
		background-color: #ffffff;
		padding: 1upx 30upx;
		margin-top: 50px;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
