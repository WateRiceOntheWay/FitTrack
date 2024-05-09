// pages/today/add_diet/add_diet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:null,
        password:null,
        jwtToken:null,


        diet_amount:null,

        add_button_valid:false


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 读取本地缓存
        let that = this;
        wx.getStorage({
            key:"username",
            success(res){
                that.setData({
                    username:res.data
                })
            }
        });
        wx.getStorage({
            key:"password",
            success(res){
                that.setData({
                    password:res.data
                })
            }
        });
        wx.getStorage({
            key:"jwtToken",
            success(res){
                that.setData({
                    jwtToken:res.data
                })
            }
        });
        
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


    // 判断当前数据有效性
    checkDataValid(){
        // 若没有选择运动类型

        let amount_is_valid=false;
        if (this.data.diet_amount===null||this.data.diet_amount===""){
            amount_is_valid=false;
        }
        else{
            if(this.data.diet_amount.replace(/[^\d]/g, '').length!==this.data.diet_amount.length){
                amount_is_valid=false;
                // 因为有不合法字符，应该直接返回false
                return false;
            }
            else{
                if(parseInt(this.data.diet_amount,10)<=0){
                    amount_is_valid=false;
                    // 因为距离为0，应该直接返回false
                    return false;
                }
                else{
                    amount_is_valid=true;
                }
            }
        }

        // 后期在此处添加新的条件
        return amount_is_valid;
    },

    disableAddButtonIfInvalidElseEnable(){
        if(this.checkDataValid()){
            this.setData({
                add_button_valid:true
            });
        }
        else{
            this.setData({
                add_button_valid:false
            });
        }
    }

})