// pages/recording/bodyRecords/bodyRecords.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body_records:[
      {weight:"60kg", bfp:"1.5", heartRate:"90/min",date:"2024-05-07"}
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