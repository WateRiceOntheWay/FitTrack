// pages/today/add_diet/add_diet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        diet_type_range: ['米饭', '肉类', '蛋类', '豆类', '蔬菜水果', '面食', '果汁', '牛奶', '可乐、雪碧', '水', '咖啡'],
        diet_type_index: null,
        diet_type_is_liquid: [false, false, false, false, false, false, true, true, true, true, true],

        diet_amount:null,

        add_button_valid:false


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
    DietTypePickerChange(e) {
        console.log(e);
        this.setData({
            diet_type_index: e.detail.value
        })
        this.disableAddButtonIfInvalidElseEnable();
    },

    DietAmountChange(e){
        this.setData({
            diet_amount: e.detail.value
        })
        this.disableAddButtonIfInvalidElseEnable();
    },

    // 判断当前数据有效性
    checkDataValid(){
        // 若没有选择运动类型
        if(this.data.diet_type_index===null){
            return false;
        }

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