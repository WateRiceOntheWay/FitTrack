class FitTrackRequests{
	static url_base="http"
	static sport_get_all = "da"
	static diet_get_all = ""
	static body_get_all = ""
	static sport_add = ""
	static diet_add = ""
	static body_add = ""
	static login = ""
	static signup = ""
	
	constructor(name){
		this.name = name
		this.url_base="http"
		this.sport_get_all = "da"
		this.diet_get_all = ""
		this.body_get_all = ""
		this.sport_add = ""
		this.diet_add = ""
		this.body_add = ""
		this.login = ""
		this.signup = ""
	}
	static getURL_SportGetAll(){
		return FitTrackRequests.url_base + FitTrackRequests.sport_get_all
	}
	static getURL_DietGetAll(){
		return this.url_base + this.diet_get_all
	}
	static getURL_BodyGetAll(){
		return this.url_base + this.body_get_all
	}
	static getURL_SportAdd(){
		return this.url_base + this.sport_add
	}
	static getURL_DietAdd(){
		return this.url_base + this.diet_add
	}
	static getURL_BodyAdd(){
		return this.url_base + this.body_add
    }
    
    static SportAdd(sport_info){
        // TODO
        /*
        参数解释： 
        sport_info:{
            "type":(int),
            "duration":(int)/null,
            "distance":(int)/null,
        }
        */
       
        /*
        返回值解释：
        1. 添加成功时：                             */
        return true; //这里默认返回一个true，用来在其他测试中使用
                                                    /*
        2. 添加失败时：
        return false;
        */

    }

    
    static DietAdd(diet_info){
        // TODO
        /*
        参数解释： 
        user_info:{
            "username":"***",
            "password":"***",
            "jwtToken":"***"
        }
        diet_info:{
            "type":(int),
            "amount":(int)
        }
        */
       
        /*
        返回值解释：
        1. 添加成功时：                             */
        return true;
                                                    /*
        2. 添加失败时：
        return false;
        */

    }

    static BodyAdd(body_info){
        // TODO
        /*
        参数解释： 
        user_info:{
            "username":"***",
            "password":"***",
            "jwtToken":"***"
        }
        diet_info:{
            "weight":(float),
            "bfp":(float),     // Body Fat Percentage 体脂率 在0~1之间
            "heartrate": (int)
        }
        */
       
        /*
        返回值解释：
        1. 添加成功时：                             */
        return true; 
                                                    /*
        2. 添加失败时：
        return false;
        */

    }
}
module.exports = FitTrackRequests