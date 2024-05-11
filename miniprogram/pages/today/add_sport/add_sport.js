// pages/today/add_sport/add_sport.js
import FitTrackRequests from "../../../utils/FitTrackRequests"
import FitTrackStorage from "../../../utils/FitTrackStorage"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sport_type_range: ['跑步', '骑行', '游泳', '举铁'],
        sport_type_index: null,

        //运动时长
        sport_duration: [0, 0, 0],
        sport_duration_string: "请选择运动时间",

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

        //运动距离
        diet_amount: null,

        // 添加按钮是否有效？ 在js函数被调用时使用disableAddButtonIfInvalidElseEnable()函数更改此变量，会使前端页面按钮disable或enable
        add_button_valid: false


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

    },
    SportTypePickerChange(e) {
        console.log(e);
        this.setData({
            sport_type_index: e.detail.value
        })
        this.disableAddButtonIfInvalidElseEnable();
    },
    SportDurationTimeChange(e) {
        this.setData({
            sport_duration: e.detail.value
        })

        // 改变运动时间后，更改显示的字符串
        this.setSportDurationString();

        this.disableAddButtonIfInvalidElseEnable();
    },
    SportDistanceChange(e) {
        this.setData({
            sport_distance: e.detail.value
        })
        this.disableAddButtonIfInvalidElseEnable();
    },
    Cancel() {
        wx.navigateBack()
    },

    // 更改显示的运动时间字符串
    setSportDurationString() {
        console.log(this.data.sport_duration);

        // 若时间全为0
        if (this.data.sport_duration[0] === 0 && this.data.sport_duration[1] === 0 && this.data.sport_duration[2] === 0) {
            this.setData({
                sport_duration_string: "请选择运动时间"
            });
        }

        // 若时间不为0
        else {
            this.setData({
                // " %HH%h %MM%' %SS%'' "
                sport_duration_string: this.data.duration_array[0][this.data.sport_duration[0]].toString() + "h " + this.data.duration_array[1][this.data.sport_duration[1]].toString() + "' " + this.data.duration_array[2][this.data.sport_duration[2]].toString() + "''"
            });
        }
        this.disableAddButtonIfInvalidElseEnable();
    },

    // 判断当前数据有效性
    checkDataValid() {
        // 若没有选择运动类型
        if (this.data.sport_type_index === null) {
            return false;
        }

        let distance_is_valid = false;
        if (this.data.diet_amount === null || this.data.diet_amount === "") {
            distance_is_valid = false;
        } else {
            if (this.data.diet_amount.replace(/[^\d]/g, '').length !== this.data.diet_amount.length) {
                distance_is_valid = false;
                // 因为有不合法字符，应该直接返回false，不考虑time的情况
                return false;
            } else {
                if (parseInt(this.data.diet_amount, 10) <= 0) {
                    distance_is_valid = false;
                    // 因为距离为0，应该直接返回false，不考虑time的情况
                    return false;
                } else {
                    distance_is_valid = true;
                }
            }
        }

        let time_is_valid = false;
        if (this.data.sport_duration[0] === 0 && this.data.sport_duration[1] === 0 && this.data.sport_duration[2] === 0) {
            time_is_valid = false;
        } else {
            time_is_valid = true;
        }

        return distance_is_valid || time_is_valid;
    },

    disableAddButtonIfInvalidElseEnable() {
        if (this.checkDataValid()) {
            this.setData({
                add_button_valid: true
            });
        } else {
            this.setData({
                add_button_valid: false
            });
        }
    },

    addSportInfo() {
        let that = this;

        wx.showToast({
            title: '上传数据中...',
            icon: 'loading'

        })

        FitTrackRequests.SportAdd({
            "type": this.data.sport_type_index,
            "duration": this.data.sport_duration[0] * 3600 + this.data.sport_duration[1] * 60 + this.data.sport_duration[2],
            "distance": this.data.sport_distance
        }, function (result) {
            if (result['status']) {
                let calories = null;
                if (result['status'] === true) {
                    calories = result['value']['calories'];
                } else {
                    wx.showToast({
                        title: '添加失败',
                        icon: 'error',
                        duration: 1000
                    })
                    return;
                }
                FitTrackStorage.addToTodayInformation('sport', 'duration', that.data.sport_duration[0] * 3600 + that.data.sport_duration[1] * 60 + that.data.sport_duration[2],
                    function (result) {
                        if (result['status']) {
                            FitTrackStorage.addToTodayInformation('sport', 'distance', parseInt(that.data.sport_distance),
                                function (result) {
                                    if (result['status']) {
                                        FitTrackStorage.addToTodayInformation('sport', 'calories', calories,
                                            function (result) {
                                                if (result['status']) {
                                                    console.log("success");
                                                    wx.navigateTo({
                                                        url: "add_sport_success/add_sport_success"
                                                    });
                                                    return;
                                                } else {
                                                    console.log("fail1");

                                                    wx.showToast({
                                                        title: '添加失败',
                                                        icon: 'error'
                                                    })
                                                    return;
                                                }
                                            }
                                        )
                                    } else {
                                        console.log("fail2");

                                        wx.showToast({
                                            title: '添加失败',
                                            icon: 'error'
                                        })
                                        return;
                                    }
                                }
                            )
                        } else {
                            console.log("fail3");

                            wx.showToast({
                                title: '添加失败',
                                icon: 'error'
                            })
                            return;
                        }
                    }
                )

                console.log("here");
            } else {
                wx.showToast({
                    title: '上传数据失败',
                    icon: "error"
                })
            }

        })
    }

})