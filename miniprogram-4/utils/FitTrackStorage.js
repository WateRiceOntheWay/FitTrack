/* 以下方法返回值均遵循

{
    "status":true/false,
    "value":（无值为null）
}

*/

// const { assert } = require("XrFrame/core/utils");

class FitTrackStorage {

    static getUserInfo() {

        //TODO

        return {
            "status": true,
            "value": {
                "username": "abc_u",
                "password": "def_p",
                "jwtToken": "ghi_j"
            }
        } //测试数据

        /* 返回值解释

        {
            "status": true / false, //成功获取：true，失败：false
            "value":{
                "username":"***",
                "password":"***"
                "jwtToken":"***"
            }
        }

        此返回值中"value"项可直接用在 FitTrackRequests.SportAdd() 等方法中
        */


    }

    static setUserInfo(user_info) {
        //TODO
        /*
        参数解释： 
        user_info:{
            "username":"***",
            "password":"***",
            "jwtToken":"***"
        }
        */
        return {
            "status": true
        } //测试数据

        /* 返回值解释

        成功为true，失败为false

        */
    }

    static getTodayInformation(after_function) {
        /* 返回值解释

        {
            "status": true / false, //成功获取：true，失败：false
            "value":{
                "date": Date类型,
                "sport": {
                    "info": {
                        "duration": 4632,
                        "distance": 2700,
                        "calories": 367
                    }
                },
                "diet": {
                    "info": {
                        "calories": 367
                    }
                },
                "body": {
                    "heartrate": 101,
                    "weight": 70,
                    "bfp": 43.2
                }
            }
        }

        此返回值中"userinfo"项可直接用在 FitTrackRequests.SportAdd() 等方法中
        */

        let return_value = {
            "status": false
        }

            // 设定一个延时，模拟异步操作
        wx.getStorage({
            key: "todayInformation",
            success(res) {
                let infor = res.data;

                if (infor===undefined){

                    // 如果没有记录就生成初始记录
                    return_value = {
                        "status": true,
                        "value": {
                            "date": new Date(),
                            "sport": {
                                "info": {
                                    "duration": 0,
                                    "distance": 0,
                                    "calories": 0
                                }
                            },
                            "diet": {
                                "info": {
                                    "calories": 0
                                }
                            },
                            "body": {
                                "heartrate": null,
                                "weight": null,
                                "bfp": null
                            }
                        }
                    }
                    console.log(return_value)
                    FitTrackStorage.setTodayInformation(infor);
                }
                else{
                    // 判定是否为今天，初始化sport和diet
                    if (infor["date"] < new Date()) {
                        infor["sport"] = {
                            "info": {
                                "duration": 0,
                                "distance": 0,
                                "calories": 0
                            }
                        };
                        infor["diet"] = {
                            "info": {
                                "calories": 0
                            }
                        };
                        infor["date"] = new Date();
                    }
                    FitTrackStorage.setTodayInformation(infor);

                    return_value = {
                        "status": true,
                        "value": infor
                    }
                }


            },
            fail() {
            },
            complete(){
                console.log(after_function);
                if(after_function!==undefined){
                    after_function(return_value);
                }
            //     运行完毕后执行给定的after_function函数
                return return_value;
            }
        })



    }

    static setTodayInformation(value,after_function) {
        /* 参数解释

        value:{
            "date": Date类型,
            "sport": {
                "info": {
                    "duration": 4632,
                    "distance": 2700,
                    "calories": 367
                }
            },
            "diet": {
                "info": {
                    "calories": 367
                }
            },
            "body": {
                "heartrate": 101,
                "weight": 70,
                "bfp": 43.2
            }
        }

        */
        let return_value = {
            "status": false
        }

        wx.setStorage({
            key: "todayInformation",
            data: value,
            success(res) {
                return_value = {
                    "status": true
                }
            },
            fail() {
                return_value = {
                    "status": false
                }
            },
            complete(){
                console.log(after_function);
                if(after_function!==undefined){
                    after_function(return_value);
                }
                return return_value;
            }
        })

    }

    static addToTodayInformation(struc1, struc2, value,after_function) {
        FitTrackStorage.getTodayInformation(
            function (result){
                console.log(result)
                if (result["status"] === false) {
                    return {
                        "status": false
                    };
                }
                let todayInformation = result['value'];
                let structure = {
                    "sport": {
                        "duration": 1,
                        "distance": 1,
                        "calories": 1
                    },
                    "diet": {
                        "calories": 1
                    },
                    "body": {
                        "heartrate": 2,
                        "weight": 2,
                        "bfp": 2
                    }
                }
                // assert(structure[struc1][struc2] !== null);
                if (structure[struc1][struc2] == 1) {
                    todayInformation[struc1][struc2] += value;
                } else if (structure[struc1][struc2] == 2) {
                    todayInformation[struc1][struc2] = value;
                }

                let return_value = {
                    "status": false
                }
                wx.setStorage({
                    key: "todayInformation",
                    data: todayInformation,
                    success(res) {
                        return_value = {
                            "status": true
                        }
                    },
                    fail() {
                        return_value = {
                            "status": false
                        }
                    },
                    complete(){
                        console.log(after_function);
                        if(after_function!==undefined){
                            after_function(return_value);
                        }
                        return return_value;
                    }
                })
            }
        );

    }


}
module.exports = FitTrackStorage