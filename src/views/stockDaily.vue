<template>
  <div class="pd20">
    <select v-model="selectedCondition" @change="conditionChange()" class="selectStyle">
      <option :value="value.conditionId" v-for="(value, index) in dataFilter">{{value.conditionText}}</option>
    </select>
    <h3 class="title">涨停板复盘（{{pageData[0].risedate}}）</h3>
    <ul class="tableTitle flex" id="tableTitle">
      <li>股票名称</li>
      <li>涨停时间</li>
      <li>涨停原因</li>
      <li>公司行业</li>
      <li>公司地址</li>
      <li>现价</li>
      <li>板数</li>
    </ul>
    <template v-for="(value, index) in pageData">
      <ul class="tableBody flex" :key="index">
        <li>{{value.gname}}</li>
        <li>{{value.firstrise}}</li>
        <li>{{value.cause}}</li>
        <li>{{value.industry}}</li>
        <li>{{value.area}}</li>
        <li>{{value.outstandvalue}}</li>
        <li :class="{linkBoardsText: value.bordcout > 1}">{{value.bordcout}}板</li>
      </ul>
      <div v-if="value.causeRises.length" v-for="(value1, index1) in value.causeRises" class="flex linkBoards" :style="divWidth">
        <span :style="spanWidth">{{value1.risedate}}</span>
        <span :style="spanWidth">{{value1.firstrise}}</span>
        <span :style="spanWidth">{{value1.cause}}</span>
      </div>
    </template>
  </div>
</template>

<script>
  import {todayData} from '../assets/js/stockData'
  export default {
    data () {
      return {
        pageData: todayData.data,
        liWidth: '',
        spanWidth: {},
        divWidth: {},
        dataFilter: [
          {conditionId: 0, conditionText: '全部'},
          {conditionId: 1, conditionText: '排除新股和ST'},
          {conditionId: 2, conditionText: '所有连板股'},
          {conditionId: 3, conditionText: '连板股，排除新股和ST'}
        ],
        selectedCondition: '0'
      }
    },
    mounted () {
      let liWidth = document.getElementById('tableTitle').children[0].clientWidth
      console.log(liWidth)
      this.liWidth = liWidth
      this.spanWidth = {
        width: liWidth + 'px'
      }
      this.divWidth = {
        width: this.liWidth * 3 + 'px'
      }
    },
    methods: {
      conditionChange () {
        if (this.selectedCondition == 0) { // 全部
          this.pageData = todayData.data
        } else if (this.selectedCondition == 1) { // 排除新股和ST
          let newArr = todayData.data.filter(function (item, index, arr) {
            return (item.cause != '新股' && item.gname.indexOf('ST') == -1)
          })
          this.pageData = newArr
        } else if (this.selectedCondition == 2) { // 所有连板股
          let newArr = todayData.data.filter(function (item, index, arr) {
            return item.bordcout > 1
          })
          this.pageData = newArr
        } else if (this.selectedCondition == 3) { // 连板股，排除新股和ST
          let newArr = todayData.data.filter(function (item, index, arr) {
            return (item.bordcout > 1 && item.cause != '新股' && item.gname.indexOf('ST') == -1)
          })
          this.pageData = newArr
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/vars";
  .title{
    text-align: center;
    padding: 10px 0;
  }
  .tableTitle{
    border-bottom: 1px solid @color-border;
    li{
      width: 14.2%;
      padding: 10px 0 10px 10px;
      font-weight:bold;
      padding-left: 10px;
    }
  }
  .tableBody{
    li{
      width: 14.2%;
      padding: 6px 0 6px 10px;
      border-bottom: 1px solid @color-border;
    }
  }
  .linkBoards{
    background-color: #FFE3EA;
    border-bottom: 1px solid @color-border;
    border-right: 1px solid @color-border;
    >span{
      padding: 6px 0 6px 10px;
    }
  }
  .linkBoardsText{
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
  .selectStyle{
    border-radius: 5px;
    border: 1px solid @color-border;
    outline: none;
    padding: 10px;
  }
</style>
