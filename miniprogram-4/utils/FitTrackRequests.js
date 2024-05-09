import FitTrackStorage from './FitTrackStorage'
class FitTrackRequests{

    static url_base="https://base"
    static sport_get_all = "/sports"
    static diet_get_all = "/diet" 
    static body_get_all = "/body"
    static sport_add = "sports/add"
    static diet_add = "/diet/add"
    static body_add = "/body/add"
    static login = "/login"
    static signup = "/signup"
    static username=""
    static jwtToken=""
	constructor(name){
        FitTrackStorage.getUserInfo(function(result){
            FitTrackRequests.username = result["value"]["username"]
            FitTrackRequests.jwtToken = result["value"]["jwtToken"]
        })   
	}
	static getURL_SportGetAll(){
		return FitTrackRequests.url_base + FitTrackRequests.sport_get_all + FitTrackRequests.username
	}
	static getURL_DietGetAll(){
		return  FitTrackRequests.url_base +  FitTrackRequests.diet_get_all + FitTrackRequests.username
	}
	static getURL_BodyGetAll(){
		return  FitTrackRequests.url_base +  FitTrackRequests.body_get_all + FitTrackRequests.username
	}
	static getURL_SportAdd(){
		return  FitTrackRequests.url_base +  FitTrackRequests.sport_add
	}
	static getURL_DietAdd(){
		return  FitTrackRequests.url_base +  FitTrackRequests.diet_add
	}
	static getURL_BodyAdd(){
		return  FitTrackRequests.url_base +  FitTrackRequests.body_add
    }
    
    static SportAdd(sport_info, after_function){
        // TODO
        /*
        参数解释： 
        sport_info:{
            "type":(int),
            "duration":(int)/null,
            "distance":(int)/null,
        }
        */
       let return_value={}
        wx.request({
          url: `${FitTrackStorage.getURL_SportAdd}`,
          headers: {  
            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
          }, 
          data:{
            "username":FitTrackRequests.username,
            "gamesName":sport_info["type"],
            "sportsTime":sport_info["duration"],
            "sportsDistance":sport_info["distance"]
          },
          success(res){
            return_value={
                "status":true,
                "value":{
                    "calories":res.data["data"]["calories"]
                }
            }
            console.log("添加成功")
          },
          fail(res){
              return_value={
                  "status":false
              }
              console.log("添加失败")
          },
          complete(){
              if(after_function!==undefined)
              after_function(return_value)
          }
        })
        
        /*



        返回值解释：
        1. 添加成功时：                             */
        return {
            "status":true,
            "value":{
                "calories":123
            }
        }; //这里默认返回一个true，用来在其他测试中使用
                                                    /*
        2. 添加失败时：
        return {
            "status":false
        };
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
        return {
            "status":true,
            "value":{
                "calories":456
            }
        };
                                                    /*
        2. 添加失败时：
        return {
            "status":false
        };
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
        return {
            "status":true
        }; 
                                                    /*
        2. 添加失败时：
        return {
            "status":false
        }; 
        */

    }
}
module.exports = FitTrackRequests