// pages/dietRecords/dietRecords.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
import * as echarts from '../../../components/ec-canvas/echarts.min'
function processDietDataToPie(data) {
  const result = {};

  // 遍历数据并合并相同名称的项
  data.forEach(record => {
    const calories = parseFloat(record.calories);
    const foodName = record.foodName;

    if (result[foodName]) {
      result[foodName] += calories;
    } else {
      result[foodName] = calories;
    }
  });

  // 将结果转换成所需的数组格式
  return Object.entries(result).map(([name, value]) => ({
    name,
    value
  }));
}

function initChart(canvas, width, height, data, chartType){
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  const createTime = data.map(record => record.createTime)
  const calories = data.map(record => record.calories)
  const data_pie = processDietDataToPie(data)
  console.log("data_pie is : ", data_pie)
  const option = {
    title: chartType==='pie'?{
      text: '食物摄入占比图',
      left: 'center',
      top:'top',
    }:{
      text: '摄入卡路里变化图',
      left: 'center',
      top:'top',
    },
    xAxis: chartType==='pie'?null:{
      type: 'category',
      data: createTime
    },
    yAxis: chartType==='pie'?null:{
      type: 'value'
    },


    tooltip: chartType==='pie'?{
      trigger: 'item'
    }:null,
    legend: chartType==='pie'? {
      orient: 'vertical',
      left: 'left',
      top:'bottom'
    }:{
      data:['calories']
    },
    series: chartType==='pie'?[
      {
        name: 'Access From',
        type: 'pie',
        radius: '80%',
        center:['55%','55%'],
        data: data_pie,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]:[
      {
        data: calories,
        type: 'line',
        smooth: true
      }
    ]
  }
  chart.setOption(option)
  return chart
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec_pie:{
      onInit:null
    },
    ec_line:{
      onInit:null
    },

    diet_records:[
      {foodName:"饺子",calories:"200",weight:"200",createTime:"05-24"},
      {foodName:"饺子",calories:"300",weight:"250",createTime:"05-25"},
      {foodName:"面条",calories:"1000",weight:"500",createTime:"05-27"},
      {foodName:"饺子",calories:"200",weight:"200",createTime:"05-29"},
      {foodName:"西瓜",calories:"280",weight:"230",createTime:"05-31"}
    ],
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //设置用户信息
    let that = this
    FitTrackStorage.getUserInfo(function(res){
      if(res["status"])
      {
         that.setData({
        userinfo:res["value"]
      })
        console.log("获取用户信息成功")
      }
      else
      console.log("获取用户信息失败")
    })
    //设置饮食记录数据
    let getAll = true
    FitTrackRequests.getDietAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        that.setData({
          diet_records:res["dietinfo"]
        })
        console.log("获取饮食信息成功")
        console.log(that.data.diet_records)
      }else
      console.log("获取饮食信息失败")
    })
    that.setData({
      ec_pie: {
        onInit: (canvas, width, height) => initChart(canvas, width, height, that.data.diet_records,'pie')
      },
      ec_line:{
        onInit: (caches, width, height) => initChart(caches, width, height, that.data.diet_records,'line')
      }
    })
    //初始化图表
    that.selectComponent('#mychart-dom-pie').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.diet_records);
    })
    that.selectComponent('#mychart-dom-line').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.diet_records);
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})