// pages/dietRecords/dietRecords.js
import FitTrackRequests from '../../../utils/FitTrackRequests'
import FitTrackStorage from '../../../utils/FitTrackStorage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diet_records:[],
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //设置用户信息
    FitTrackStorage.getStorage(function(res){
      if(res["status"])
      {
         this.setData({
        userinfo:res["value"]
      })
        console.log("获取用户信息成功")
      }
      else
      console.log("获取用户信息失败")
    })
    //设置饮食记录数据
    let getAll = true
    FitTrackRequests.getDietAll(this.data.userinfo,getAll=true,function(res){
      if(res["status"])
      {
        this.setData({
          diet_records:res["value"]
        })
        console.log("获取饮食信息成功")
        console.log(this.data.diet_records)
      }else
      console.log("获取饮食信息失败")
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