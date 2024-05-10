// pages/login/login.js
import FitTrackRequests from '../../utils/FitTrackRequests'
import FitTrackStorage from '../../utils/FitTrackStorage'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "username":null,
    "password":null,
    "jwtToken":null
  },

  login_using_password: function(data){
    this.setData({
      username: data.detail.value.username,
      password: data.detail.value.password
    }) 
    let login_info={
        "username": this.data.username ,
        "password": this.data.password
    }
    let suc = false
    wx.showToast({
        title: '加载中...',
        icon:"loading",
        duration:10000
    })
    FitTrackRequests.Login(login_info,function(res){
      if(res["status"])
      {
        wx.showToast({
            title: '注册成功！',
            icon: 'success'
          })
        FitTrackStorage.setUserInfo(res["userinfo"],
            function(){
            wx.redirectTo({
            url: '../today/today',
            });
        })
      }else{

        wx.showToast({
            title: '出错了，请重试',
            icon: 'error'
          })

      }
    })
  },

  login_using_wechat: ()=>{
    console.log("login using wechat")
  },

  signup: ()=>{
    wx.navigateTo({
      url:"/pages/signup/signup"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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