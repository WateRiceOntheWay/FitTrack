const FitTrackStorage = require("../../../utils/FitTrackStorage");

const app = getApp()
Page({
    data: {
        //导航栏
        tabIndex: 0,
        tabList: [
            {
                name: "全部",
                isSelect: true
            },
            {
                name: "运动",
                isSelect: false,
                color:"blue"
            },
            {
                name: "饮食",
                isSelect: false,
                color:"green"
            },
            {
                name: "身体指标",
                isSelect: false,
                color:"pink"
            },{
                name: "生活",
                isSelect: false,
                color:"yellow"
            },
            {
                name: "其他",
                isSelect: false,
                color:"gray"
            }
        ],
        statusBarHeight: app.globalData.statusBarHeight,
        wallData: [],
        showZan: -1, //显示点赞按钮
        showPinLun: false,
        nmAvator: '/image/pyq/ng.jpg',
        commentValue: '',
        placeholderPL: '评论',
        userInfo: {},
        batchTimes: undefined, //分页
        btoText: "正在加载...",
        adminOpenid: "oOmqu4pDpN-1db4Ms_U0fjmCfBAw",
        shareObg: {
            title: '仲恺校友圈',
            desc: '',
            path: '/pages/pyq/circle/index',
            imageUrl: "/image/pyq/pyq03.jpg",
        } //转发样式
        ,

        InputBottom: 0,
        inputFocused: false,
        showComment: false,
        commenting_id: undefined,
        now_pulling_down: false
    },


    lookDetail(e) {
        console.log(e.currentTarget.dataset.index)
        // var data = JSON.stringify(this.data.wallData[e.currentTarget.dataset.index])
        wx.navigateTo({
            url: './detail?id=' + e.currentTarget.dataset.index,
        })
    },

    getcomment(e) {
        // console.log(e)
        this.setData({
            commentValue: e.detail.value
        })
    },

    bindChangeTab(e) {
        console.log(e.currentTarget.dataset.index)
        var tab = this.data.tabList
        for (var i = 0; i < tab.length; i++) {
            tab[i].isSelect = false
        }
        tab[e.currentTarget.dataset.index].isSelect = true
        this.setData({
            tabList: tab,
            tabIndex: e.currentTarget.dataset.index
        })
        this.getWallData(0, 10, false, tab[e.currentTarget.dataset.index].name)
    },


    bindComment(e) {
        console.log(e.currentTarget.dataset)
        this.setData({
            placeholderPL: "回复: " + e.currentTarget.dataset.name,
            showZan: e.currentTarget.dataset.indexn,
            showPinLun: true,
        })
    },

    lookArticle(e) {
        wx.navigateTo({
            url: '/pages/code/article/index?url=' + e.currentTarget.dataset.url,
        })
    },

    showPinLun(e) {
        console.log(e)
        console.log(this.data.wallData)
        var main = this.data.wallData[e.currentTarget.dataset.indexn].userInfo.nickName
        this.setData({
            commenting_id: e.currentTarget.dataset._id
        })
    },

    previewImage: function (e) {
        console.log(e)
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
        })
    },

    dianzan(e) {
        let that = this;
        console.log(e)
        console.log(e.currentTarget.dataset)
        console.log(e.currentTarget.dataset.indexn)
        console.log(this.data.userInfo)
        // if (!this.data.userInfo) {
        //     wx.pageScrollTo({
        //         scrollTop: 200,
        //     })
        //     wx.showToast({
        //         title: '需要授权才能点赞评论,见第一条墙消息.',
        //         icon: 'none'
        //     })
        //     return
        // }


        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            console.log("登录：res")
            console.log(res)
            if (res.result===null){
                return
            }
            var isZan = that.data.wallData[e.currentTarget.dataset.indexn].zans.some(a => {
                return a.openid === res.result.openid
            })
            console.log("是否已点赞：")
            console.log(isZan)
            //未点赞
            if (!isZan) {
                var data = that.data.wallData
                data[e.currentTarget.dataset.indexn].zans.push({
                    name: that.data.userInfo.nickName,
                    openid: res.result.openid
                })
                console.log(that.data.userInfo.nickName)
                data[e.currentTarget.dataset.indexn].zanText = data[e.currentTarget.dataset.indexn].zans.map(a => {
                    return a.name
                }).join(", ")
                data[e.currentTarget.dataset.indexn].i_zanned = true
                that.setData({
                    wallData: data
                })
                console.log("WallData: ")
                console.log(that.data.wallData)
                wx.cloud.callFunction({
                    name: 'chat',
                    data: {
                        type: 'zan',
                        collectionname: 'circle',
                        data: {
                            username: that.data.userInfo.nickName,
                            _id: e.currentTarget.dataset._id
                        }
                    }
                }).then(res => {
                    console.log("打印点赞调用结果")
                    console.log(res)
                    wx.vibrateShort({
                        type: 'heavy'
                    })
                    // 刷新此项数据
                    // const db = wx.cloud.database()
                    // db.collection("circle").doc(e.currentTarget.dataset._id).get().then(
                    //     res => {
                    //         console.log(res.data)
                    //         var data = this.data.wallData
                    //         data[e.currentTarget.dataset.indexn] = res.data
                    //         for (let i = 0; i < data.length; i++) {
                    //             data[i].time = that.parseTime(data[i].createTime.getTime())
                    //             data[i].zanText = data[i].zans.map(a => {
                    //                 return a.name
                    //             }).join(", ")
                    //             data[i].i_zanned = false
                    //             for (var zan in data[i].zans) {
                    //                 if (zan.openid === that.data.userInfo.openid) {
                    //                     data[i].i_zanned = true
                    //                 }
                    //             }
                    //         }
                    //         that.setData({
                    //             wallData: data
                    //         })
                    //     }
                    // )

                })
            }
            this.setData({
                showZan: -1,
                placeholderPL: "留言"
            })
        })

    },

    submitComment(e) {
        // wx.showToast({
        //   title: '评论功能暂未开放',
        //   icon: 'none'
        // })
        // return

        if (!this.data.userInfo) {
            wx.pageScrollTo({
                scrollTop: 200,
            })
            wx.showToast({
                title: '需要授权才能点赞评论,见第一条墙消息.',
                icon: 'none',
                duration: 5000
            })
            return
        }
        if (this.data.commentValue.length <= 0) {
            wx.showToast({
                title: '内容为空',
                icon: 'none'
            })
            return
        }
        // var _id = this.data.wallData[this.data.showZan]._id
        // var formId = e.detail.formId
        // var toName = ""
        // if (this.data.placeholderPL.includes("回复")) {
        //     toName = this.data.placeholderPL.replace("回复:", "")
        //     console.log(toName)
        // }
        var _id = this.data.commenting_id
        wx.cloud.callFunction({
            name: 'chat',
            data: {
                type: 'comment',
                collectionname: 'circle',
                data: {
                    username: this.data.userInfo.nickName,
                    userInfo: this.data.userInfo,
                    // formId: formId,
                    _id: this.data.commenting_id,
                    comment: this.data.commentValue,
                    // toName: toName
                }
            }
        }).then(res => {
            console.log(res)

            //更新这条数据
            const db = wx.cloud.database()
            console.log(_id)
            db.collection("circle").doc(_id).get().then(
                res => {
                    console.log(res.data)
                    var data = this.data.wallData
                    console.log(data)
                    console.log(e.currentTarget.dataset.indexn)
                    data[this.data.showZan] = res.data

                    for (let i = 0; i < data.length; i++) {
                        data[i].time = this.parseTime(data[i].createTime.getTime())
                        data[i].zanText = data[i].zans.map(a => {
                            return a.name
                        }).join(", ")
                    }
                    this.setData({
                        wallData: data,
                        showZan: -1,
                        placeholderPL: "留言",
                        showPinLun: false,
                        commentValue: ""
                    })
                    let that = this
                    wx.showToast({
                        title: '评论成功',
                        icon: '评论成功'
                    }).then(res=>{
                        that.onLoad()
                    })
                    
                }
            )
        })
    },

    copyText(e) {
        console.log(e.currentTarget.dataset.text)
        wx.setClipboardData({
            data: e.currentTarget.dataset.text,
        })

    },

    toHome() {
        wx.navigateToMiniProgram({
            appId: 'wxa596944194794d5b',
        })
        // wx.switchTab({
        //   url: '/pages/index/index',
        // })
    },

    toEdit() {
        wx.navigateTo({
            url: '../edit/index',
        })
        // wx.showToast({
        //   title: '发布功能暂未开放',
        //   icon: 'none'
        // })
    },


    getMyWallData() {
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            const db = wx.cloud.database()
            db.collection("circle").where({
                _openid: res.result.openid
            }).get().then(res => {
                var zanText
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
                    res.data[i].zanText = res.data[i].zans.map(a => {
                        return a.name
                    }).join(", ")
                }
                var data = res.data.sort(function (a, b) {
                    return b.createTime.getTime() - a.createTime.getTime()
                })
                this.setData({
                    wallData: data
                })
                console.log(this.data.wallData);
                wx.hideNavigationBarLoading()

            })
        })
    },

    getWallData(skip = 0, limit = 10, concat = true, tab = undefined) {
        let that = this;
        console.log(this.data.userInfo)
        wx.showNavigationBarLoading()
        wx.showToast({
            title: '加载中',
            icon: 'loading',
        })
        const db = wx.cloud.database()

        if (tab === "表白墙") {
            tab = "表白"
        }
        if (tab === "全部") {
            tab = undefined
        }
        db.collection("circle").skip(skip).limit(limit).orderBy('time', 'desc').where({
            tab: tab,
            isTop: false
        }).get().then(res => {
            var zanText
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
                res.data[i].zanText = res.data[i].zans.map(a => {
                    return a.name
                }).join(", ")


                res.data[i].i_zanned = false
                for (const zan of res.data[i].zans) {
                    if (zan.openid === that.data.openid) {
                        res.data[i].i_zanned = true
                    }
                }

                if (res.data[i].content.length > 100) {
                    res.data[i].isOver = true
                    res.data[i].content = res.data[i].content.slice(0, 96) + "..."

                }

                res.data[i].comments = res.data[i].comments.sort(function (a, b) {
                    return a.createTime.getTime() - b.createTime.getTime()
                })
                let flag=true;
                for(let j=0;j<that.data.tabList.length && flag;j++){
                    if (that.data.tabList[j].name === res.data[i].tab){
                        res.data[i].tabColor = that.data.tabList[j].color;
                        flag=false;
                    }
                }
                if (flag){
                    res.data[i].tabColor = "gray";
                }
            }


            console.log(res.data)
            var data = res.data.sort(function (a, b) {
                return b.createTime.getTime() - a.createTime.getTime()
            })
            if (concat) {
                data = this.data.wallData.concat(data)
            }
            if (data.length === 0) {
                this.setData({
                    btoText: '暂无更多~'
                })
            }
            this.setData({
                wallData: data
            })
            wx.hideToast()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            this.setData({
                now_pulling_down: false
            })
        })
    },

    cancleTop(e) {
        var that = this
        var item = e.currentTarget.dataset.item
        const db = wx.cloud.database()
        wx.showModal({
            title: '提示',
            content: '确定取消置顶吗',
            cancelText: '取消',
            confirmText: '确定取消',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: 'chat',
                        data: {
                            type: 'top',
                            collectionname: 'circle',
                            data: {
                                _id: item._id,
                                isTop: false
                            }
                        }
                    }).then(res => {
                        wx.showToast({
                            title: '成功',
                        })
                    })
                }
            }
        })
    },

    adminTopPyq(e) {
        var that = this
        var item = e.currentTarget.dataset.item
        const db = wx.cloud.database()
        wx.showModal({
            title: '提示',
            content: '确定置顶吗',
            cancelText: '取消',
            confirmText: '置顶',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: 'chat',
                        data: {
                            type: 'top',
                            collectionname: 'circle',
                            data: {
                                _id: item._id,
                                isTop: true
                            }
                        }
                    }).then(res => {
                        wx.showToast({
                            title: '成功',
                        })
                    })
                }
            }
        })
    },
    adminDeletePyq(e) {
        var that = this
        var item = e.currentTarget.dataset.item
        const db = wx.cloud.database()
        wx.showModal({
            title: '提示',
            content: '确定删除吗',
            cancelText: '取消',
            confirmText: '删除',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: 'chat',
                        data: {
                            type: 'delete',
                            collectionname: 'circle',
                            data: {
                                fileIDs: item.images,
                                _id: item._id
                            }
                        }
                    }).then(res => {
                        var data = that.data.wallData
                        data.splice(e.currentTarget.dataset.index, 1)
                        that.setData({
                            wallData: data
                        })

                    })
                }
            }
        })

    },

    deletePyq(e) {
        console.log(e.currentTarget.dataset.item)
        console.log(e.currentTarget.dataset.index)
        var that = this
        var item = e.currentTarget.dataset.item
        const db = wx.cloud.database()
        wx.showModal({
            title: '提示',
            content: '确定删除吗',
            cancelText: '取消',
            confirmText: '删除',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    var data = that.data.wallData
                    data.splice(e.currentTarget.dataset.index, 1)
                    that.setData({
                        wallData: data
                    })

                    db.collection('circle').doc(item._id).remove()
                        .then(console.log)
                        .catch(console.error)

                    db.collection('circleback').add({
                        data: {
                            userInfo: item.userInfo,
                            createTime: item.createTime,
                            content: item.content,
                            zans: item.zans,
                            images: item.images,
                            comments: item.comments,
                        },
                    })
                    // wx.cloud.deleteFile({
                    //   fileList: ['a7xzcb']
                    // }).then(res => {
                    //   // handle success
                    //   console.log(res.fileList)
                    // }).catch(error => {
                    //   // handle error
                    // })
                } else if (res.cancel) {
                }
            }
        })
    },

    onLoad: function (options) {
        // var that = this
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo
        //     })
        // } else {
        //     // 查看是否授权
        //     wx.getSetting({
        //         success(res) {
        //             if (res.authSetting['scope.userInfo']) {
        //                 // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //                 wx.getUserInfo({
        //                     success(res) {
        //                         that.setData({
        //                             userInfo: res.userInfo
        //                         })
        //                     }
        //                 })
        //             }
        //         }
        //     })
        // }
        let that = this;

        FitTrackStorage.getUserInfo((result) => {
            if (result['status']) {
                var userInfo = that.data.userInfo;
                userInfo.nickName = result['value']['username']
                that.setData({
                    userInfo: userInfo
                })

                that.getOpenid().then(
                    ()=>{
                        console.log(that.data.openid)
                        that.getWallData(0, 10, false)
                    }
                )
            }
            else{
                wx.navigateTo("/pages/login/login")
            }
        })




        // wx.cloud.callFunction({
        //     name: 'login'
        // }).then(res => {
        // 	console.log("第582行中的openid调试")
        //     console.log(res.result.openid)

        //     that.setData({
        //         openid: res.result.openid
        //     })
        // })
    },

    async getOpenid() {
        let that = this;
        try {
            const res = await wx.cloud.callFunction({
                name: 'login'
            });
            console.log("第599行中的openid调试");
            console.log(res.result.openid);
            that.setData({
                openid: res.result.openid
            });
        } catch (err) {
            console.error('云函数调用失败', err);
        }
    },

    toShowZan(e) {
        if (e.currentTarget.dataset.index === this.data.showZan) {
            this.setData({
                showZan: -1,
                placeholderPL: "留言"
            })
        } else {
            this.setData({
                showZan: e.currentTarget.dataset.index
            })
        }
    },


    onPullDownRefresh: function () {
        this.setData({
            now_pulling_down: true
        })
        wx.vibrateShort({
            type: 'light'
        })
        this.getWallData(0, 10, false, this.data.tabList[this.data.tabIndex].name)
        if (this.data.tabIndex === 3) {
            this.getTopWallData()
        }

    },

    getWallDataOfSkip() {
        var batchTimes = this.data.batchTimes
        var skip = this.data.wallData.length
        if (batchTimes > 0) {

            this.getWallData(skip, 10, true, this.data.tabList[this.data.tabIndex].name)

            this.setData({
                batchTimes: this.data.batchTimes - 1
            })
        } else {
            this.setData({
                btoText: '已经到底了~'
            })
        }
    },

    onReachBottom: function () {
        console.log("Bottom")
        this.getWallDataOfSkip()
    },

    bindShare(e) {
        var that = this
        var item = e.currentTarget.dataset.item
        console.log(item)
        var imageUrl = "/image/pyq/pyq03.jpg"
        if (item.images.length > 0) {
            imageUrl = item.images[0]
        }
        var shareObg = {
            title: '仲恺校友圈',
            desc: item.content,
            path: '/pages/pyq/circle/index',
            imageUrl: imageUrl,
        } //转发
        this.setData({
            shareObg: shareObg
        });
    },

    onShow: function () {
        // this.getWallData(0, this.data.wallData.length, false)
        const db = wx.cloud.database()
        db.collection('circle').count().then(res => {
            console.log(res.total)
            const total = res.total
            // 计算需分几次取
            const batchTimes = Math.ceil(total / 10)
            console.log(batchTimes)
            this.setData({
                batchTimes: batchTimes - 1
            })
        })

        this.getTopWallData()
    },

    onShareAppMessage: function (e) {
        var that = this
        switch (e.from) {
            case 'button':
                var item = e.target.dataset.item
                var desc;
                if (item.content.length > 15) {
                    desc = item.content.slice(0, 15) + "…";
                } else {
                    desc = item.content
                }
                var imageUrl = "/image/pyq/2.jpg"
                console.log(item)
                if (item.content.length < 2 || !item.content) {
                    desc = item.userInfo.nickName + "给你发来一条消息"
                    console.log("12324")
                }
                var shareObg = {
                    title: desc,
                    path: '/pages/pyq/circle/detail?id=' + item._id,
                    imageUrl: imageUrl,
                } //转发
                return shareObg
            case 'menu':
                var shareObg = {
                    title: 'FitTrack - 健身跟踪',
                    path: '/pages/today/today',
                    imageUrl: "/images/icon.jpeg",
                } //转发
                return shareObg
        }
    },

    onPageScroll: function (e) {
        this.setData({
            showZan: -1,
            placeholderPL: "留言",
            showPinLun: false,
        })
    },

    parseTime(dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime(); //获取当前时间毫秒
        var diffValue = now - dateTimeStamp; //时间差

        if (diffValue < 0) {
            return;
        }
        var minC = diffValue / minute; //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        var result = "23分钟前"
        if (monthC >= 1 && monthC <= 3) {
            result = " " + parseInt(monthC) + "月前"
        } else if (weekC >= 1 && weekC <= 3) {
            result = " " + parseInt(weekC) + "周前"
        } else if (dayC >= 1 && dayC <= 6) {
            result = " " + parseInt(dayC) + "天前"
        } else if (hourC >= 1 && hourC <= 23) {
            result = " " + parseInt(hourC) + "小时前"
        } else if (minC >= 1 && minC <= 59) {
            result = " " + parseInt(minC) + "分钟前"
        } else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚"
        } else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    },

    getTopWallData() {

        const db = wx.cloud.database()

        db.collection("circle").orderBy('time', 'desc').where({
            isTop: true
        }).get().then(res => {
            var zanText
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
                res.data[i].zanText = res.data[i].zans.map(a => {
                    return a.name
                }).join(", ")

                if (res.data[i].content.length > 100) {
                    res.data[i].isOver = true
                    res.data[i].content = res.data[i].content.slice(0, 96) + "..."
                }

                res.data[i].comments = res.data[i].comments.sort(function (a, b) {
                    return a.createTime.getTime() - b.createTime.getTime()
                })
                res.data[i].i_zanned = false
                for (var zan in res.data[i].zans) {
                    if (zan.openid == this.data[i].userInfo.openid) {
                        res.data[i].i_zanned = true
                    }
                }
            }


            var data = res.data.sort(function (a, b) {
                return b.createTime.getTime() - a.createTime.getTime()
            })


            this.setData({
                topData: data
            })
        })
    },

    // 底部tabbar相关
    toToday() {
        wx.redirectTo({
            url: "/pages/today/today"
        })
    },
    toRecording() {
        wx.redirectTo({
            url: "/pages/recording/recording"
        })
    },
    toMe() {
        wx.redirectTo({
            url: "/pages/me/me"
        })
    },

    StartComment(e) {
        this.setData({
            InputBottom: e.detail.height,
            inputFocused: true,
            showComment: true,
            commenting_id: e.currentTarget.dataset._id,
            commentValue: e.currentTarget.dataset._id === this.data.commenting_id ? this.data.commentValue : ''
        })
        console.log("comment_id:")
        console.log(this.data.commenting_id)
    },

    EndComment(e) {
        this.setData({
            InputBottom: 0,
            inputFocused: false,
            showComment: false
        })
    },
    ChangeCommentValue(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },
    onReady() {
        let that = this;
        let query = wx.createSelectorQuery();
        query.select('.top_bar').boundingClientRect(rect => {
            let clientHeight = rect.height;
            let clientWidth = rect.width;
            let ratio = 750 / clientWidth;
            let height = clientHeight * ratio;

            that.setData({
                top_bar_height: height
            })
        }).exec();
        query.select('.switch_bar').boundingClientRect(rect => {
            let clientHeight = rect.height;
            let clientWidth = rect.width;
            let ratio = 750 / clientWidth;
            let height = clientHeight * ratio;

            that.setData({
                switch_bar_height: height
            })
        }).exec();

        wx.getSystemInfo({
            success: function (res) {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let ratio = 750 / clientWidth;
                let height = clientHeight * ratio;
                that.setData({
                    screen_height: height
                });
            }
        });
    },
    seeDetail(e) {
        wx.navigateTo({
            url: './detail?id=' + e.currentTarget.dataset._id,
        })
    }

})