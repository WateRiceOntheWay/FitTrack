// pages/dietRecords/dietRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diet_records:[],
    username:"",
    date:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getStorage({
      key:"username",
      success(res){
        console.log("读取本地存储username成功")
        that.setData({
          username:res.data
        })
      }
    })
    wx.request({
      url: 'https://834d6e6b-e1e1-459b-a575-8d290d5bbed2.mock.pstmn.io/diet_getAll',
      method:'GET',
      data:{
        "username" : that.data.username,
        "getAll": true
      },
      success(res){
        console.log(res.data.data)
        if(res.data.code == 1){
          that.setData(
            {
             diet_records:res.data.data
            }
          )
        }
        else{
          console.log("未找到数据")
        }
      },
      fail(res){
        console.log("请求失败")
      }
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