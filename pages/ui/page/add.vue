<template name="ui">
	<view>
		<cu-custom bgColor="bg-gradual-pink"  :isBack="true" >
			<block slot="backText">返回</block>
			<block slot="content">添加页面</block>
		</cu-custom>
		<form>

        <view  class="cu-form-group">
            <view class="title">所属APP</view>
            <input placeholder="请输入APP名称" maxlength="15" name="input" v-model="appName"></input>
        </view>
		

        <view  class="cu-form-group">
			<view class="title">页面名字</view>
			<input placeholder="请输入页面名字"  name="input" v-model="pageName"></input>
		</view>
		
		<view class="cu-form-group-add margin-top" >
			<textarea maxlength="-1"  @input="textareaAInput" placeholder="请输入页面说明" v-model="memo"></textarea>
		</view>

		<button class="cu-btn block bg-blue margin-tb-sm lg" :url="'/pages/ui/app/home'" @click="addPageData">添加</button>

		</form>
	</view>
</template>

<script>
    import {addPage} from '../../../api/ui'

	export default {

		data() {
			return {
				textareaAValue: '',
				appName: null,
				pageName: null,
				memo: null,

			}

		},
		methods:{
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
            addPageData() {
				// TODO


                // 构造请求参数
                const data = {
                    app_name: this.appName,
					page_name: this.pageName,
					memo: this.memo
                }
                addPage(data).then(response=>{
                    console.log(response)
                }).catch(error => console.log(error))
                this.$router.push({path:'/pages/ui/page/home'})
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
