// pages/today/add_diet/add_diet.js
import FitTrackRequests from "../../../utils/FitTrackRequests";
import FitTrackStorage from "../../../utils/FitTrackStorage";

Page({

    /**
     * 页面的初始数据
     */
    data: {

        body_weight:null,
        body_bfp:null,
        body_heartrate:null


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
    Cancel() {
        wx.navigateBack()
    },
    Submit(){

        let that = this;

        wx.showToast({
            title: '上传数据中...',
            icon: 'loading',
            duration: 10000
        });

        FitTrackRequests.BodyAdd({
            "weight": that.data.body_weight,
            "bfp": that.data.body_bfp,
            "heartrate": that.data.body_heartrate
        },function(result){
            if(result['status']){
                FitTrackStorage.addToTodayInformation('body','weight',that.data.body_weight,function(result){
                    if(result['status']){
                        FitTrackStorage.addToTodayInformation('body','bfp',that.data.body_bfp,function(result){
                            if(result['status']){
                                FitTrackStorage.addToTodayInformation('body','heartrate',that.data.body_heartrate,function(result){
                                    if(result['status']){
                                        wx.showToast({
                                            title: '上传成功',
                                            icon: 'success'
                                        })
                                        wx.navigateTo({
                                            url:"add_body_success/add_body_success"
                                        });
                                    }
                                    else{
                                        wx.showToast({
                                            title: '上传失败',
                                            icon: 'error'
                                        })
                                    }
                                })
                            }
                            else{
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'error'
                                });
                            }
                        })
                    }
                    else{
                        wx.showToast({
                            title: '上传失败',
                            icon: 'error'
                        });
                    }

                })
            }
            else{
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                });
            }
        });
    },
    BodyWeightChange(e) {
        let value = parseFloat(e.detail.value.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/, ''));
        if (Number.isNaN(value)) {
            value = null;
        }
        console.log(value);
        this.setData({
            body_weight: value
        })

    },

    BodyBFPChange(e){
        let value = parseFloat(e.detail.value.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/, ''));
        if (Number.isNaN(value)) {
            value = null;
        }
        else{
            if (value>=100){
                value=100
            }
            else if(value<=0) {
                value = 0
            }
        }
        console.log(value);
        this.setData({
            body_bfp: value
        })
    },

    BodyHeartrateChange(e){
        let value = parseInt(e.detail.value.replace(/[^0-9]/ig, ""));
        if (Number.isNaN(value)) {
            value = null;
        }
        console.log(value);
        this.setData({
            body_heartrate: value
        })
    },


    // 判断当前数据有效性
    // checkDataValid(){
    //     // 若没有选择运动类型
    //
    //     for (let tocheck in )
    //
    //     let amount_is_valid=false;
    //     if (this.data.diet_amount===null||this.data.diet_amount===""){
    //         amount_is_valid=false;
    //     }
    //     else{
    //         if(this.data.diet_amount.replace(/[^\d]/g, '').length!==this.data.diet_amount.length){
    //             amount_is_valid=false;
    //             // 因为有不合法字符，应该直接返回false
    //             return false;
    //         }
    //         else{
    //             if(parseInt(this.data.diet_amount,10)<=0){
    //                 amount_is_valid=false;
    //                 // 因为距离为0，应该直接返回false
    //                 return false;
    //             }
    //             else{
    //                 amount_is_valid=true;
    //             }
    //         }
    //     }
    //
    //     // 后期在此处添加新的条件
    //     return amount_is_valid;
    // },

    // disableAddButtonIfInvalidElseEnable(){
    //     if(this.checkDataValid()){
    //         this.setData({
    //             add_button_valid:true
    //         });
    //     }
    //     else{
    //         this.setData({
    //             add_button_valid:false
    //         });
    //     }
    // }

})