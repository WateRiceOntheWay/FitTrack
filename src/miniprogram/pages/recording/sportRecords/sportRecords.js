// pages/sportRecording/sportRecording.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
import * as echarts from '../../../components/ec-canvas/echarts.min'
function processData_line(creatTime, distance){
  console.log("distance is : ",distance)
  console.log("createTime is :", creatTime)
  const data = {}
  for(let i=0;i<creatTime.length;i++){
    const time = creatTime[i]
    const dist = parseFloat(distance[i])
    if(data[time])
    {
      data[time] += dist
    }
    else{
      data[time] = dist
    }
  }
  return Object.entries(data)
}
function initChart(canvas, width, height, data, chartType) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  console.log("data is: " , data)
  const xAxisLables = data.map(record => `${record.createTime.slice(5,10)} \n ${record.gamesName}`);
  const distances = data.map(record => record.sportsDistance);
  const createTime = data.map(record =>record.createTime.slice(5,10))
  const time = data.map(record => record.sportsTime)
  const data_line = processData_line(createTime, distances)
  console.log("data_line_graphy is : ",data_line)
  const option = {
    title: {
      text: chartType === 'bar'? '运动数据统计\n':'运动距离跟踪',
      left: 'center',
      top: 'top'
    },
    legend:{
      data:chartType === 'bar'? ['Distance','Time']:['Distances'],
      top: '25rpx'
    },
    xAxis: chartType==='bar'?{
      type: 'category',
      data: xAxisLables
    }:{
      type: 'category',
      boundaryGap: false
    },
    yAxis: chartType==='bar'?{
      type: 'value'
      
    }:{
      type: 'value',
      boundaryGap: [0, '30%'], // 调整 boundaryGap
      axisLabel: {
        formatter: '{value}m',
        margin:1
      },
      grid:{
        left:20
      }
    },
    visualMap: chartType==='bar'?null:{
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: 'rgba(0, 0, 180, 0.4)'
        },
        {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 0, 180, 0.4)'
        }
      ]
    },
    series: chartType === 'bar'?[
      {
        name:'Distance',
        data: distances,
        type: 'bar'
      },
      {
        name:'Time',
        data: time,
        type:'bar'
      }
    ]:
    [
      {
        type: 'line',
        name:'Distance',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
        },
        areaStyle: {},
        data: data_line
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  ec_bar: {
    onInit: null
  },
  ec_line:{
    onInit:null
  },
  data: {
    sport_records:[{
      gamesName:"跑步",
      sportsDistance:"10",
      sportsTime:"300",
      createTime:"2024.10.01"
    },
    {
      gamesName:"跑步",
      sportsDistance:"200",
      sportsTime:"300",
      createTime:"2024.10.05"
    },
    {
      gamesName:"跑步",
      sportsDistance:"700",
      sportsTime:"300",
      createTime:"2024.10.10"
    },
  {
      gamesName:"跑步",
      sportsDistance:"1000",
      sportsTime:"300",
      createTime:"2024.10.15"
    }],
    sport_type_range: ['跑步', '骑行', '游泳', '举铁'],
    userinfo:{}
  },

  viewDetail:function(event){
    var record = event.currentTarget.dataset.record; // 获取记录
    console.log("单个记录")
    console.log(record);
    wx.navigateTo({
      url: 'singleSportRecord/singleSportRecord?item=' + JSON.stringify(record),
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
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
    //这是运动记录数据
    let getAll = true
    FitTrackRequests.getSportsAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        let tmp = res["sportinfo"];
        for(var item of tmp){
          item["gamesName"] = that.data.sport_type_range[item["gamesName"]];
        }
        that.setData({
          sport_records:tmp
        })
        console.log("获取运动信息成功")
        console.log(res)
        console.log(that.data.sport_records)
      }else
      console.log("获取运动信息失败")
    })
    that.setData({
      ec_bar: {
        onInit: (canvas, width, height) => initChart(canvas, width, height, that.data.sport_records, 'bar')
      },
      ec_line:{
        onInit: (canvas, width, height) => initChart(canvas, width, height, that.data.sport_records, 'line')
      }
    })
    // 初始化图表
    that.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.sport_records);
    });
    that.selectComponent('#mychart-dom-line').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.sport_records);
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