// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "username":null,
    "password":null
  },

  login_using_password: function(data){
    this.setData({
      username: data.detail.value.username,
      password: data.detail.value.password
    }) 
    let that = this;
    wx.request({
      url: 'https://1474c86e-0018-42ca-84a8-d5910a5e81a0.mock.pstmn.io/login',
      method:'POST',
      data:{
        "username":that.data.username,
        "password":that.data.password
      },
      success(res){
        if (res && res.data) {
          if(res.data.code == 1){
            wx.navigateTo({
              url: '../recording/recording?username=' + that.data.username + '&password=' + that.data.password,
            })
          }
          else{
            wx.showModal({
              title:"提示",
              content:"密码错误",
              showCancel:false
            })
          }
        } else {
          console.log('请求没有成功，或者返回的数据格式不正确')
        }
      },
      fail(res){
        wx.showModal({
          title:"提示",
          content:"服务器未响应",
          showCancel:false
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