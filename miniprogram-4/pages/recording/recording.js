// pages/recording/recording.js
import FitTrackRequests from '../../utils/FitTrackRequests'
import FitTrackStorage from '../../utils/FitTrackStorage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportRecords:[],
    dietRecords:[],
    bodyRecords:[],
    dietTitle:[
      {eat:'类型', weight: '重量', kcal: 'kcal', date: '日期', time: '时间'}
    ],
    userinfo:{}
  },
  
  more_records_sport:function(event){
    wx.navigateTo({
      url: 'sportRecords/sportRecords',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  more_records_diet:function(event){
    wx.navigateTo({
      url: 'dietRecords/dietRecords',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  more_records_body:function(event){
    wx.navigateTo({
      url: 'bodyRecords/bodyRecords',
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
    this.setUserInfo()
    let getAll = false
    let that = this
    //获取运动数据
    FitTrackRequests.getSportsAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        that.setData({
          sportRecords:res["sportinfo"]
        })
        console.log("获取部分运动信息成功")
        console.log("传入数据")
        console.log(res["sportinfo"])
        console.log(that.data.sportRecords)
      }
      else
      console.log("获取运动信息失败")
    })
    //获取饮食数据
    FitTrackRequests.getDietAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        that.setData({
          dietRecords:res["dietinfo"]
        })
        console.log("获取部分饮食信息成功")
        console.log(that.data.dietRecords)
      }
      else
      console.log("获取饮食信息失败")
    })
    //获取身体数据
    FitTrackRequests.getBodyAll(that.data.userinfo,getAll,function(res){
      if(res["status"])
      {
        that.setData({
          bodyRecords:res["bodyinfo"]
        })
        console.log("获取部分身体信息成功")
        console.log(that.data.bodyRecords)
      }
      else
      console.log("获取饮食信息失败")
    })
  },

/*
  设置用户名和密码
*/
  setUserInfo(){
    let that = this
    FitTrackStorage.getUserInfo(function(res){
      if(res["status"])
      {
        that.setData({
        userinfo:res["value"]
      })
      console.log("获取用户信息成功，如下")
      console.log(that.data.userinfo)
      }
      else
      console.log("获取用户信息失败")
    })
  },
  toToday(){
      wx.redirectTo({
          url:"/pages/today/today"
      })
  },
  toCommunity(){
      wx.redirectTo({
        url: '/pages',
      })
  },
  setURL:function(){

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