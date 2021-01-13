<template name="tabControl">
		<scroll-view  scroll-x="true" :style="'background-color:'+bgc+';top:'+top+'px;'" :class="fixed?'fxied':''" :scroll-left='scrollLeft' scroll-with-animation id="tabcard">
			<view class="tabList" :style="isEqually?'display: flex;justify-content: space-between;padding-left:0;':''">
				<view
					:class="'tabItem'+(currentIndex==index?' thisOpenSelect':'')"
					:style="isEqually? 'width:'+windowWidth/values.length+'px;margin-right:0;':''"
					v-for="(item,index) in values" 
					:id="'item'+index"
					:key='index' 
					@tap="_onClick(index)">
					<yu-privi-icon v-if="item.title && vType==='icon'" class="scroll-view-item_v" :title="item.title" :icon="item.icon" :icon-text="item.text" :is-active="currentIndex==index" :subTitle="item.sub" @on-tap="_onClick(item, index)"></yu-privi-icon>
					<view v-else-if="vType !='icon'" :style="(currentIndex==index?'font-size:'+activeSize+'rpx;color:'+activeColor:'font-size:'+itemSize+'rpx')">
						<view>{{item.level}}</view>
						<text>{{item.title}}</text>
					</view>
					<!-- <view class="activeLine" :style="{width: lineWidth+'rpx'}"></view> -->
				</view>
			</view>
		</scroll-view>
</template>

<script>
import YuPriviIcon from "./privilege-icon/index.vue";
	export default {
		name:'tabControl',
		components: {
			YuPriviIcon
		},
		props:{
			vType: {//type:Icon 图标类型展示    text:文本展示乐行
				type: String,
				default: 'icon'
			},
			current: {
				type: [Number, String],
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			bgc:{
				type:String,
				default:''
			},
			fixed:{
				type:Boolean,
				default:false
			},
			scrollFlag:{
				type:Boolean,
				default:false
			},
			lineWidth:{
				type:Number,
				default: 48
			},
			itemSize:{
				type:Number,
				default: 30
			},
			activeSize:{
				type:Number,
				default: 32
			},
			activeColor:{
				type:String,
				default:''
			},
			top:{
				type:Number,
				default: 0
			},
			isEqually:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				lastIndex: -1,
				currentIndex: 0,
				windowWidth: 0,	//设备宽度
				leftList:[],	//选项距离左边的距离
				widthList:[],	//选项宽度
				scrollLeft:0,   //移动距离
				newScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
				wornScroll:0,    //上一次移动距离(用来判断是左滑还是右滑)
			};
		},
		mounted(){
			setTimeout(()=>{
				uni.createSelectorQuery().in(this).select("#tabcard").boundingClientRect((res)=>{
					if (res && res.height) {
						this.$emit('getTabCardHeight', {height:res.height})
					}
				}).exec()
				uni.getSystemInfo({
				    success: (res)=> {
						this.windowWidth = res.windowWidth;
						this.values.forEach((i,v)=>{
							let info = uni.createSelectorQuery().in(this);
							info.select("#item"+v).boundingClientRect((res)=>{
								// 获取第一个元素到左边的距离
								// if(v==0){
								// 	this.startLenght = res.left
								// }
							  this.widthList.push(res.width)
								this.leftList.push(res.left)
							}).exec()
						})
				  }
				});
			})
		},
		created() {
			this.currentIndex = Number(this.current)
			if(this.scrollFlag){
				setTimeout(()=>{
					this.tabListScroll(Number(this.current))
				},300)
			}
		},
		watch: {
			'current':{
				handler: function(val){
					let tVal = Number(val);
					//初始化进入界面 超过当前tab显示数量
					if( this.lastIndex == -1 && tVal > 3){
						this.currentIndex = tVal;
						return;
					}
					//正常滑动时处理
					if (tVal !== this.currentIndex) {
						this.lastIndex = this.currentIndex;
						this.currentIndex = tVal;
						//内容块滚动时，左滑右滑控制
						if((this.currentIndex - this.lastIndex > 0 && this.currentIndex >3) || 
							(this.currentIndex - this.lastIndex < 0 && this.currentIndex <5)){
							this.tabListScroll(tVal)
						}
					}
				},
				immediate:true
			}
		},
		methods: {
      getSystemInfo() {
        yu.getSystemInfo({
        	success: function (res) {
            this.windowWidth = res.windowWidth;
            this.scrollLeft = res.windowWidth;
        	}
        });
      },
			_onClick(item, index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {item: item,currentIndex:index})
					// 开启滚动
					if(this.scrollFlag){
						this.tabListScroll(index)
					}
				}
			},
			// 选项移动
			tabListScroll(index){
				let scoll = 0;
				this.wornScroll = index;
				// this.wornScroll-this.newScroll>0 在向左滑  ←←←←←
				if(this.wornScroll-this.newScroll>0){
					for(let i = 0;i<this.leftList.length;i++){
						if(i>1&&i==this.currentIndex){
							scoll = this.leftList[i-1]
						}
					}
					// console.log('在向左滑',scoll)
				}else{
					if(index>1){
						for(let i = 0;i<this.leftList.length;i++){
							if(i<index-1){
								scoll = this.leftList[i]
							}
						}
					}else{
						scoll = 0
					}
					// console.log('在向右滑')
				}
				this.newScroll = this.wornScroll;
				this.scrollLeft = scoll;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fxied{
		position: fixed;
		z-index: 2;
	}
	.tabList{
		padding-top: 38rpx;
		padding-left: 38rpx;
		padding-bottom: 36rpx;
		white-space: nowrap;
		text-align: center;
		.tabItem{
			margin-right: 68rpx;
			display: inline-block;
			position: relative;
		}
	}
	
</style>
