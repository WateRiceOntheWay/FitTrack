// pages/sportRecording/sportRecording.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sport_records:[],
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
        that.setData({
          sport_records:res["sportinfo"]
        })
        console.log("获取运动信息成功")
        console.log(res)
        console.log(that.data.sport_records)
      }else
      console.log("获取运动信息失败")
    })
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