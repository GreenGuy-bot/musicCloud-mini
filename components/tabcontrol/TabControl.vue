<template>
<!--  二级导航栏，点击变红，并把点击对象传到外部home  -->
    <view class="tabControl">
        <view  v-for="(item,index) in title" @click="active(index)" class="tab-control-item"
             :class="{ActiveRed:currentIndex === index}">
            <text>{{item.name}}</text>
        </view>
    </view>
</template>

<script>
  export default {
    name: "TabControl",
	props:['videoGroupList'],
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      active(index){
        this.$emit('tabClick',index) //将被点击的index传出去
        this.currentIndex = index
      }
    },
    props:{
      title:{
        type:Array,
        default(){
          return;[]
        }
      }
    }

  }
</script>

<style scoped>
    .tabControl{
        display: flex;
		background-color: white;
        text-align: center;
		white-space: nowrap;
    }
    .tab-control-item{
        flex: 1;
		width: 145rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 30rpx;
        margin-left: 15rpx;
        margin-right: 15rpx;
		box-sizing: border-box;
    }
    .ActiveRed{
        color:red;
        border-bottom: red solid 6rpx ;
        padding-bottom: 10rpx;
    }

</style>