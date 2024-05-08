class FitTrackStorage {

    static getUserInfo() {

        //TODO

        return {
            "status": true,
            "user_info": {
                "username": "abc_u",
                "password": "def_p",
                "jwtToken": "ghi_j"
            }
        } //测试数据

        /* 返回值解释

        {
            "status": true / false, //成功获取：true，失败：false
            "user_info":{
                "username":"***",
                "password":"***"
                "jwtToken":"***"
            }
        }

        此返回值中"userinfo"项可直接用在 FitTrackRequests.SportAdd() 等方法中
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
        return true //测试数据

        /* 返回值解释

        成功为true，失败为false

        */
    }


}