<template name="ui">
	<view>
		<cu-custom bgColor="bg-gradual-pink"  :isBack="true" >
			<block slot="backText" :url="'/pages/element/home'">返回</block>
			<block slot="content">添加页面</block>
		</cu-custom>
		<form>

        <view  class="cu-form-group">
            <view class="title">所属APP</view>
            <input placeholder="请输入APP名称" maxlength="15" name="input" v-model="appName"></input>
        </view>
		
		<view  class="cu-form-group">
		    <view class="title">所属页面</view>
		    <input placeholder="请输入APP名称" maxlength="15" name="input" v-model="appName"></input>
		</view>
		

        <view  class="cu-form-group">
			<view class="title">页面名字</view>
			<input placeholder="请输入页面名字"  name="input" v-model="pageName"></input>
		</view>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
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
				imgList: [],

			}

		},
		methods:{
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
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
