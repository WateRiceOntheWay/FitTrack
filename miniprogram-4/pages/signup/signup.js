// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // notations:{
    //   username:"",
    //   password:"",
    //   repassword:""
    // }
  },
  check_username:function (username){
    // 检测用户名是否可用
    // TODO
    if (username==""){
      return false;
    }
    return true;
  },
  signup: function(data){
    if (data.detail.value.password.length<6){
      console.log("123")
      wx.showModal({
        title:"提示",
        content:"密码必须大于6位！",
        showCancel:false
      })
    }
    else if(data.detail.value.password != data.detail.value.repassword){
      wx.showModal({
        title:"提示",
        content:"两次输入密码不一致！",
        showCancel:false
      })
    }
    else if(!this.check_username(data.detail.value.username)){
      wx.showModal({
        title:"提示",
        content:"用户名为不可用",
        showCancel:false
      })
    }
    else{
      // 完成本地检测，上传用户数据
      var status = this.upload_signup_info({
        "username": data.detail.value.username,
        "password": data.detail.value.password
      })
      if (status==true){
        //成功
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        })

        // TODO
        // 自动登录

        wx.reLaunch({
          url:"../recording/recording?username=" + data.detail.value.username + "&password=" + data.detail.value.password
        });
      }else{
        //失败
        wx.showToast({
          title: '出错了，请重试',
          icon: 'error'
        })
      }
    }
  },
  
  
  upload_signup_info(signup_info){
    /** 使用此函数上传注册数据
     * 
     * {
     *    "username":,
     *    "password":
     * }
     * 
     * 成功返回true, 失败返回false
     */
      wx.request({
        url: 'https://2f2b4039-2bd0-474a-98b0-1948754c300d.mock.pstmn.io/signin',
        method:'POST',
        data: signup_info,
        success(res){
          if(res.data.code == 1){
            return true
          }
          else{
            return false
          }
        },
        fail(res){
          wx.showModal({
            title:"提示",
            content:"注册失败，请重新注册",
            showCancel:false
          })
        }
      })


    return true;
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