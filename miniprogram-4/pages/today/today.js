// pages/today.js
import FitTrackRequests from "../../utils/FitTrackRequests"
import FitTrackStorage from "../../utils/FitTrackStorage"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: null,
        password: null,
        jwtToken: null,

        ModalName: null,

        //运动时长
        goal_sport_duration: [0, 0, 0],
        goal_sport_duration_string: "未设定",

        // 生成时间多项选择列表的项，24/60/60
        duration_array: [
            (() => {
                let rg = new Array(24);
                for (let i = 0; i < 24; i++) {
                    rg[i] = i.toString().length === 1 ? "0" + i.toString() : i.toString();
                }
                return rg;
            })(),
            (() => {
                let rg = new Array(60);
                for (let i = 0; i < 60; i++) {
                    rg[i] = i.toString().length === 1 ? "0" + i.toString() : i.toString();
                }
                return rg;
            })(),
            (() => {
                let rg = new Array(60);
                for (let i = 0; i < 60; i++) {
                    rg[i] = i.toString().length === 1 ? "0" + i.toString() : i.toString();
                }
                return rg;
            })(),
        ],
        goal_sport_distance : null,
        goal_sport_calories : null,


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;






        // 获取用户数据缓存
        wx.getStorage({
            key: "username",
            success(res) {
                that.setData({
                    username: res.data
                })
                wx.getStorage({
                    key: "password",
                    success(res) {
                        that.setData({
                            password: res.data
                        })
                    }
                })
                wx.getStorage({
                    key: "jwtToken",
                    success(res) {
                        that.setData({
                            jwtToken: res.data
                        })
                    }
                })
            },
            fail() {
                wx.setStorage({
                    key: "showLoginSuccess",
                    value: true
                })
                // wx.navigateTo({
                //     url: "/pages/login/login"
                // });
            }
        })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let that = this;
        // 获取每日运动目标
        FitTrackStorage.getDailyGoal(
            function (result) {
                console.log(result)
                if (result['status'] === true) {
                    that.setData({
                        dailyGoal: result['value']
                    })
                } else {
                    wx.showToast({
                        title: '获取目标失败',
                        icon: 'error'
                    })
                }
        })
        // 测试
        console.log(this.data.dailyGoal)
        //

       // 获取今日信息
        FitTrackStorage.getTodayInformation(
        function (result) {
            if (result['status'] === true) {
                that.setData({
                    todayInformation: result['value']
                })
            } else {
                wx.showToast({
                    title: '获取数据失败',
                    icon: 'error'
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let that = this;
        wx.getStorage({
            key: "showLoginSuccess",
            success(res) {
                if (res.data == true) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success'
                    })
                    that.setData({
                        showLoginSuccess: false
                    })
                    // 将数据存入缓存
                    wx.getStorage({
                        key: "username",
                        success(res) {
                            that.setData({
                                username: res.data
                            })
                        }
                    });
                    wx.getStorage({
                        key: "password",
                        success(res) {
                            that.setData({
                                password: res.data
                            })
                        }
                    });
                    wx.getStorage({
                        key: "jwtToken",
                        success(res) {
                            that.setData({
                                jwtToken: res.data
                            })
                        }
                    });
                }
            }
        })

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
        wx.showToast({
            title: '刷新中...',
            icon:'loading'
        })
        this.onReady();
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
    GoalSportDistanceChange(e) {
        let value = parseInt(e.detail.value.replace(/[^0-9]/ig, ""));
        if (Number.isNaN(value)){ // 一定要用isNaN方法 
            value=0;
        }
        console.log(value);
        this.setData({
            goal_sport_distance: value
        })

        // this.disableAddButtonIfInvalidElseEnable();
    },
    GoalSportCaloriesChange(e) {
        let value = parseFloat(e.detail.value.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/, ''));
        if (Number.isNaN(value)){
            value=0;
        }
        console.log(value);
        this.setData({
            goal_sport_calories: value
        })


        // this.disableAddButtonIfInvalidElseEnable();
    },
    GoalSportDurationTimeChange(e) {
        this.setData({
            goal_sport_duration: e.detail.value
        })

        // 改变运动时间后，更改显示的字符串
        this.setGoalSportDurationString();

        // this.disableAddButtonIfInvalidElseEnable();
    },
    // 更改显示的运动时间字符串
    setGoalSportDurationString(){
        console.log(this.data.goal_sport_duration);

        // 若时间全为0
        if(this.data.goal_sport_duration[0]===0&&this.data.goal_sport_duration[1]===0&&this.data.goal_sport_duration[2]===0){
            this.setData({
                goal_sport_duration_string: "未设定"
            });
        }

        // 若时间不为0
        else{
            this.setData({
                // " %HH%h %MM%' %SS%'' "
                goal_sport_duration_string: this.data.goal_sport_duration[0].toString()+"h "+this.data.goal_sport_duration[1].toString()+"' "+this.data.goal_sport_duration[2].toString()+"''"
            });
        }
    },

    // 绑定更改每日运动目标确认按钮
    setGoalSportButton(){
        let that = this;

        let duration =  this.data.goal_sport_duration[0]*3600+ this.data.goal_sport_duration[1]*60 + this.data.goal_sport_duration[2];
        let distance = this.data.goal_sport_distance;
        let calories = this.data.goal_sport_calories;
        let use=!(duration==0&&distance==0&&calories==0);

        FitTrackStorage.setDailyGoal({
            "use":use,
            "info":{
                "duration":duration,
                "distance":distance,
                "calories":calories
            }
        },function (result) {
            if (result['status'] === true) {
                that.setData({
                    dailyGoal: {
                        "use":use,
                        "info":{
                            "duration":duration,
                            "distance":distance,
                            "calories":calories
                        }
                    }
                })
                that.hideModals();
                wx.showToast({
                    title: '更改成功',
                    icon: 'success'
                })
            } else {
                wx.showToast({
                    title: '更改失败',
                    icon: 'error'
                })
            }
        })


    },

    addSportRecord() {
        this.hideModals();
        wx.navigateTo({
            url: "add_sport/add_sport"
        });
    },
    addDietRecord() {
        this.hideModals();
        wx.navigateTo({
            url: "add_diet/add_diet"
        });
    },
    addBodyRecord() {
        this.hideModals();
        wx.navigateTo({
            url: "add_body/add_body"
        });
    },

    // 模态框
    hideModals() {
        /**
         * 关闭 所有 模态框
         */
        this.setData({
            ModalName: null
        });
    },
    showModalAddNewRecord() {
        /**
         * 打开 添加新记录的模态框
         */
        this.setData({
            ModalName: 'AddRecord'
        });
    },

    showModalAddGoal() {
        /**
         * 打开 添加目标的模态框
         */
        this.setData({
            ModalName: 'AddGoal'
        });
    },

    showModalDailyGoal() {
        /**
         * 打开 更改每日运动目标的模态框
         */
        this.setData({
            ModalName: 'DailyGoal',
            goal_sport_duration: this.data.dailyGoal['info']['duration']===0?[0,0,0]:[parseInt(this.data.dailyGoal['info']['duration']/3600),parseInt((this.data.dailyGoal['info']['duration']%3600)/60),this.data.dailyGoal['info']['duration']%60],
            goal_sport_distance: this.data.dailyGoal['info']['distance'],
            goal_sport_calories: this.data.dailyGoal['info']['calories']
        });
    },

    // 底部tabbar相关
    toRecording() {
        wx.redirectTo({
            url: "/pages/recording/recording"
        })
    },
    toMe(){
        wx.redirectTo({
            url: "/pages/me/me"
        })
    }
})