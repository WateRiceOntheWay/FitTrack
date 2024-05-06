// pages/recording/recording.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportRecords:[],
    dietRecords:[],
    dietTitle:[
      {eat:'类型', weight: '重量', kcal: 'kcal', date: '日期', time: '时间'}
    ],
    username:"",
    password:"",
    date:"",
    jwtToken:""
  },
  
  more_records_sport:function(event){
    wx.navigateTo({
      url: 'sportRecords/sportRecords?username=' + this.data.username,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  more_records_diet:function(event){
    wx.navigateTo({
      url: 'dietRecords/dietRecords?username=' + this.data.username,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("success")
    this.setUserInfo()
    console.log(this.data.username)
    let that = this
    console.log("success")
    wx.request({
      url: 'https://ea05c617-6cdc-4b66-9f10-e015cb44471b.mock.pstmn.io/sport_getAll',
      method:'GET',
      data:[
        {
          "username": that.data.username,
          "getAll":false
        }
      ],
      success(res){
        console.log(res.data)
        if(res.data.code == 1){
          that.setData(
            {
             sportRecords:res.data.data
            }
          )
          console.log("test")
          console.log(that.data.sportRecords)
        }
        else{
          console.log("未找到数据")
        }
      },
      fail(res){
        console.log("请求失败")
      }
    })
    wx.request({
      url: 'https://834d6e6b-e1e1-459b-a575-8d290d5bbed2.mock.pstmn.io/diet_getAll',
      method:'GET',
      data:{
        "username" : that.data.username,
        "getAll":false
      },
      success(res){
        console.log(res.data)
        if(res.data.code == 1){
          that.setData(
            {
             dietRecords:res.data.data
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

  },
  /*
  设置用户名和密码
  */
 setUserInfo(){
   let that = this
  wx.getStorage({
    key:'username',
    success(res){
      console.log("读取本地用户名：")
      console.log(res.data)
      that.setData({
        username:res.data
      })
    },
    fail(res){
      console.log("读取本地存储username失败")
    }
  })
  wx.getStorage({
    key:'password',
    success(res){
      console.log("读取本地密码：")
      console.log(res.data)
      that.setData({
        password:res.data
      })
    },
    fail(res){
      console.log("读取本地存储password失败")
    }
  })
  wx.getStorage({
    key:'jwtToken',
    success(res){
      console.log("读取JWT：")
      console.log(res.data)
      that.setData({
        jwtToken:res.data
      })
    },
    fail(res){
      console.log("读取本地存储jwtToken失败")
    }
  })
 },
 toToday(){
     wx.redirectTo({
         url:"/pages/today/today"
     })
 }
})