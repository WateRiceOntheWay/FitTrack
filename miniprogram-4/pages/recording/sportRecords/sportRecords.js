// pages/sportRecording/sportRecording.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sport_records:[],
    cal:100,
    username:""
  },

  viewDetail:function(event){
    var record = event.currentTarget.dataset.record; // 获取记录
    console.log(record);
    wx.navigateTo({
      url: 'singleSportRecord/singleSportRecord?cal=' + this.data.cal + '&item=' + JSON.stringify(record),
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /*
    console.log("This is sportRecords")
    console.log(options)
    */
    this.setData({
      username: options
    })

    let that = this
    wx.request({
      url: 'https://ea05c617-6cdc-4b66-9f10-e015cb44471b.mock.pstmn.io/sport_getAll',
      method:'GET',
      data:[
        {
          "username": that.data.username,
          "getAll":true
        }
      ],
      success(res){
//        console.log(res.data.data)
        if(res.data.code == 1){
          that.setData(
            {
             sport_records:res.data.data
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