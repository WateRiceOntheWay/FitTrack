// pages/recording/bodyRecords/bodyRecords.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
import * as echarts from '../../../components/ec-canvas/echarts.min'

function initChart(canvas, width, height, data, chartType) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  console.log("data is: " , data)
  const heartRate = data.map(record => record.heartRate.replace('/min',''))
  const createTime = data.map(record =>record.createTime)
  const bodyFatRate = data.map(record => record.bodyFatRate)
  const weight = data.map(record => record.weight.replace('kg',''))
  const heartRateNumbers = heartRate.map(hr => parseFloat(hr));
  const bodyFatRateNumbers = bodyFatRate.map(bfr => parseFloat(bfr));
  const weightNumbers = weight.map(w => parseFloat(w));


  console.log("heartRate: ", heartRate);
  console.log("createTime: ", createTime);
  console.log("bodyFatRate: ", bodyFatRate);
  console.log("weight: ", weight);

  const option = {
    title: {
      text: chartType === 'bar'? '身体数据统计\n':'身体状况跟踪',
      left: 'center',
      top: 'top'
    },
    
    legend:{
      data:['weight','bodyFatRate','heartRate'],
      top: '25rpx'
    },

    xAxis:{
      type: 'category',
      data: createTime
    },

    yAxis:{
      type: 'value'
      
    },

    series: chartType === 'bar'?[
      {
        name:'weight',
        data: heartRateNumbers,
        type: 'bar'
      },
      {
        name:'bodyFatRate',
        data: bodyFatRateNumbers,
        type:'bar'
      },
      {
        name:'heartRate',
        data: weightNumbers,
        type:'bar'
      }

    ]:
    [
      {
        type: 'line',
        name:'weight',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5
        },

        data: weightNumbers
      },
      {
        type: 'line',
        name:'bodyFatRate',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#007006',
          width: 5
        },
        data: bodyFatRateNumbers
      },
      {
        type: 'line',
        name:'heartRate',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#3473C5',
          width: 5
        },
        
        data: heartRateNumbers
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
  data: {
    ec_bar:{
      onInit: null
    },
    ec_line:{
      onInit: null
    },
    body_records:[
      {weight:"59kg", bodyFatRate:"1.5", heartRate:"90/min",createTime:"05-01"},
      {weight:"60kg", bodyFatRate:"1.5", heartRate:"92/min",createTime:"05-02"},
      {weight:"65kg", bodyFatRate:"1.5", heartRate:"91/min",createTime:"05-04"},
      {weight:"56kg", bodyFatRate:"1.5", heartRate:"85/min",createTime:"05-08"},
      {weight:"66kg", bodyFatRate:"1.5", heartRate:"85/min",createTime:"05-18"},
      {weight:"76kg", bodyFatRate:"1.5", heartRate:"95/min",createTime:"05-28"}
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
        console.log("获取用户信息成功,如下")
        console.log(that.data.userinfo)
      }
      else
      console.log("获取用户信息失败")
    })
    //设置所有身体状况记录数据
    let getAll = true
    FitTrackRequests.getBodyAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        that.setData({
          body_records:res["bodyinfo"]
        })
        console.log("获取身体状况信息成功")
        console.log(that.data.body_records)
      }else
      console.log("获取身体状况信息失败")
    })
    that.setData({
      ec_bar: {
        onInit: (canvas, width, height) => initChart(canvas, width, height, that.data.body_records,'bar')
      },
      ec_line:{
        onInit: (caches, width, height) => initChart(caches, width, height, that.data.body_records,'line')
      }
    })
    //初始化图表
    that.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.body_records);
    })
    that.selectComponent('#mychart-dom-line').init((canvas, width, height) => {
      return initChart(canvas, width, height, that.data.body_records);
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