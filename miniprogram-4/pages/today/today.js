// pages/today.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: null,
        password: null,
        jwtToken: null,

        showLoginSuccess:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        wx.getStorage({
            key:"username",
            success(res){
                that.setData({
                    username:res.data
                })
                wx.getStorage({
                    key:"password",
                    success(res){
                        that.setData({
                            password:res.data
                        })
                    }
                })
                wx.getStorage({
                    key:"jwtToken",
                    success(res){
                        that.setData({
                            jwtToken:res.data
                        })
                    }
                })
            },
            fail(){
                that.setData({
                    showLoginSuccess:true
                })
                wx.navigateTo({
                    url:"/pages/login/login"
                });
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
        console.log(this.data.showLoginSuccess);
        if(this.data.showLoginSuccess){
            wx.showToast({
                title: '登录成功',
                icon: 'success'
            })
            this.setData({
                showLoginSuccess:false
            })
            // 将数据存入缓存
            wx.getStorage({
                key:"username",
                success(res){
                    this.setData({
                        username:res.data
                    })
                }
            });
            wx.getStorage({
                key:"password",
                success(res){
                    this.setData({
                        password:res.data
                    })
                }
            });
            wx.getStorage({
                key:"jwtToken",
                success(res){
                    this.setData({
                        jwtToken:res.data
                    })
                }
            });
        }
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

    showModalAddNewRecord() {
        /**
         * 打开 添加新记录的模态框
         */
        this.setData({
            ShowModalAddNewRecord: true
        });
    },
    hideModalAddNewRecord() {
        /**
         * 关闭 添加新记录的模态框
         */
        this.setData({
            ShowModalAddNewRecord: false
        });
    },
    addSportRecord() {
        this.hideModalAddNewRecord();
        wx.navigateTo({
            url: "add_sport/add_sport"
        });
    },
    addDietRecord() {
        this.hideModalAddNewRecord();
        wx.navigateTo({
            url: "add_diet/add_diet"
        });
    },
    toRecording() {
        wx.redirectTo({
            url: "/pages/recording/recording"
        })
    },

    showModalAddGoal() {
        /**
         * 打开 添加目标的模态框
         */
        this.setData({
            ShowModalAddGoal: true
        });
    },
    hideModalAddGoal() {
        /**
         * 关闭 添加新记录的模态框
         */
        this.setData({
            ShowModalAddGoal: false
        });
    }
})