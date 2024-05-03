// pages/today/add_sport/add_sport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sport_type_range: ['跑步', '骑行', '游泳', '举铁'],
        sport_type_index: null,

        //运动时长
        sport_duration: [0, 0, 0],
        duration_array: [
            (()=>{
                let rg = new Array(24);
                for(let i=0;i<24;i++){
                    rg[i] = i.toString().length===1?"0"+i.toString():i.toString();
                }
                return rg;
            })(),
            (()=>{
                let rg = new Array(60);
                for(let i=0;i<60;i++){
                    rg[i] = i.toString().length===1?"0"+i.toString():i.toString();
                }
                return rg;
            })(),
            (()=>{
                let rg = new Array(60);
                for(let i=0;i<60;i++){
                    rg[i] = i.toString().length===1?"0"+i.toString():i.toString();
                }
                return rg;
            })(),
        ],

        //运动距离
        sport_distance: null,


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(this.data.duration_array)
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
    },
    SportDurationTimeChange(e) {
        this.setData({
            sport_duration: e.detail.value
        })
    },
    SportDistanceChange(e){
        this.setData({
            sport_distance: e.detail.value.replace(/[^\d]/g, '')
        })
    },
    Cancel(){
        wx.navigateBack()
    }
})