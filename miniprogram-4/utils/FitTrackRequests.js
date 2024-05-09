import FitTrackStorage from './FitTrackStorage'
class FitTrackRequests{

    static url_base="http://118.178.135.35:8080"
    static sport_get_all = "/sports/"
    static diet_get_all = "/diet/" 
    static body_get_all = "/body/"
    static sport_add = "sports/add"
    static diet_add = "/diet/add"
    static body_add = "/body/add"
    static login = "/login"
    static signup = "/signup"
    static username=""
    static jwtToken=""
	constructor(name){
        // TODO 是否每一次请求都需要重新获取用户信息？
        FitTrackStorage.getUserInfo(function(result){
            if(result["status"]) {
                FitTrackRequests.username = result["value"]["username"]
                FitTrackRequests.jwtToken = result["value"]["jwtToken"]
            }
            else{
                wx.redirectTo("/pages/login/login");
                console.log("未登录，跳转到登录页面")
            }
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
    static getURL_Signup(){
		return  FitTrackRequests.url_base +  FitTrackRequests.signup
    }
    static getURL_Login(){
		return  FitTrackRequests.url_base +  FitTrackRequests.login
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
          url: `${FitTrackRequests.getURL_SportAdd()}`,
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

    
    static DietAdd(diet_info,after_function){
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
       let return_value={}
       wx.request({
         url: FitTrackRequests.getURL_DietAdd(),
         header:{
            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
         },
         data:{
            "username":FitTrackRequests.username,
            "foodName":diet_info["type"],
            "weight":diet_info["amount"]
         },
         success(res){
            return_value={
                "status":true,
                "value":{
                    "calories":res.data["data"]["calories"]
                }
            }
            console.log("成功添加食物")
         },
         fail(res){
             return_value={
                 "status":false
             }
             console.log("添加食物失败")
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

    static BodyAdd(body_info,after_function){
        // TODO
        /*
        参数解释： 
        user_info:{
            "username":"***",
            "password":"***",
            "jwtToken":"***"
        }
        body_info:{
            "weight":(float),
            "bfp":(float),     // Body Fat Percentage 体脂率 在0~1之间
            "heartrate": (int)
        }
        */
       let return_value={}
       wx.request({
         url: FitTrackRequests.getURL_BodyAdd(),
         headers: {  
            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
          },
          data:{
              "weight":body_info["weight"],
              "bodyFatRate":body_info["bfp"],
              "heartRate":body_info["heartRate"]
          },
          success(res){
              return_value={
                "status":true
              }
          },
          fail(res){
              return_value={
                  "status":false
              }
          },
          complete(res){
              if(after_function!==undefined)
              after_function(return_value)
          }
       })
        /*
        返回值解释：
        1. 添加成功时：                             */
       /* return {
            "status":true
        }; 
        */                                           /*
        2. 添加失败时：
        return {
            "status":false
        }; 
        */

    }
    static Login(login_info, after_function){
    /* 输入参数*/
    /*
    login_info={
        "username": "F.t",
        "password": "123456"
}
    */
    /* 输出参数*/
    /*
    登陆成功时：
    return_value={
        "status":true,
        "userinfo":{
            "username":"",
            "password":"",
            "jwtToken":""
        }
    }
    登陆失败时：
    return_value={
        "status":false
    }
    */
   let return_value={}
   wx.request({
    url: FitTrackRequests.getURL_Login(),
    method:'POST',
    data:{
      "username":login_info["username"],
      "password":login_info["password"]
    },
    success(res){
      if (res && res.data) {
        if(res.data.code == 1){
            return_value={
                "status":true,
                "userinfo":{
                    "username":login_info["username"],
                    "password":login_info["password"],
                    "jwtToken":res.data["data"]
                }
            }
        }
        else{
            return_value={
                "status":false
            }
            wx.showModal({
                title:"提示",
                content:"密码错误",
                showCancel:false
          })
        }
      } else {
        return_value={
            "status":false
        }
        console.log('请求没有成功，或者返回的数据格式不正确')
      }
    },
    fail(res){
        return_value={
            "status":false
        }
        wx.showModal({
            title:"提示",
            content:"服务器未响应",
            showCancel:false
        })
    },
    complete(res){
        if(after_function!==undefined)
        after_function(return_value)
    }
  })
    }
    static Signup(signin_info,after_function){
    /* 输入参数*/
    /*
    signin_info={
        "username": "F.t",
        "password": "123456"
}
    */
    /* 输出参数*/
    /*
    注册成功时：
    return_value={
        "status":true,
        "userinfo":{
            "username":"",
            "password":"",
            "jwtToken":""
        }
    }
    注册失败时：
    return_value={
        "status":false
    }
    */
   let return_value={}
   wx.request({
    url: FitTrackRequests.getURL_Signup(),
    method:'POST',
    data:{
      "username":signin_info["username"],
      "password":signin_info["password"]
    },
    success(res){
      if (res && res.data) {
          console.log(res)
        if(res.data.code == 1){
            return_value={
                "status":true,
                "userinfo":{
                    "username":signin_info["username"],
                    "password":signin_info["password"],
                    "jwtToken":res.data["data"]
                }
            }
        }
        else{
            return_value={
                "status":false
            }
            wx.showModal({
                title:"提示",
                content:"注册失败",
                showCancel:false
          })
        }
      } else {
        return_value={
            "status":false
        }
        console.log('请求返回的数据格式不正确')
      }
    },
    fail(res){
        return_value={
            "status":false
        }
        wx.showModal({
            title:"提示",
            content:"请求失败，服务器未响应",
            showCancel:false
        })
    },
    complete(res){
        console.log({
            signin_info
          })
        if(after_function!==undefined)
        after_function(return_value)
    }
  })
    }
    static getSportsAll(userinfo, getAll, after_function){
    /* 输入参数*/
    /*
    userinfo={
            "username":"",
            "password":"",
            "jwtToken":""
        }
    */
    /* 输出参数*/
    /*
    获取成功时：
    return_value={
        "status":true,
        "sportinfo":[{
            "username": "F.t",
            "date": "2024-05-02",
            "sportsName": "0",
            "sportsTime": "180s",
            "sportsDistance": "700",
            "calories": "100"
        }]
    }
    获取失败时：
    return_value={
        "status":false
    }
    */
   let return_value = {}
   wx.request({
    url: `${FitTrackRequests.getURL_SportGetAll()}/${getAll}`,
    method:'GET',
    headers: {  
      'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
    }, 
    data:[
      {
        "username": userinfo["username"],
        "getAll":getAll,
        "jwtToken":userinfo["jwtToken"]
      }
    ],
    success(res){
      console.log(res.data)
      if(res.data.code == 1){
        return_value={
            "status":true,
            "sportinfo":{
                "username":res.data["data"]
            }
        }
      }
      else{
        console.log("未找到数据")
      }
    },
    fail(res){
        return_value={
            "status":false
        }
      console.log("获取运动数据请求失败")
    },
    complete(res){
        if(after_function!==undefined)
        after_function(return_value)
    }
  })
    }
    static getDietAll(userinfo, getAll, after_function){
        /* 输入参数*/
        /*
        userinfo={
                "username":"",
                "password":"",
                "jwtToken":""
            }
        */
        /* 输出参数*/
        /*
        获取成功时：
        return_value={
            "status":true,
            "dietinfo":[{
                "username": "F.t",
                "date": "2024-05-02",
                "dietName": "0",
                "quantity": "300",
                "calories": "100"
            }]
        }
        获取失败时：
        return_value={
            "status":false
        }
        */
       let return_value = {}
       wx.request({
        url: `${FitTrackRequests.getURL_DietGetAll()}/${getAll}`,
        method:'GET',
        headers: {  
          'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
        }, 
        data:[
          {
            "username": userinfo["username"],
            "getAll":getAll,
            "jwtToken":userinfo["jwtToken"]
          }
        ],
        success(res){
          console.log(res.data)
          if(res.data.code == 1){
            return_value={
                "status":true,
                "dietinfo":{
                    "username":res.data["data"]
                }
            }
          }
          else{
            console.log("未找到数据")
          }
        },
        fail(res){
            return_value={
                "status":false
            }
          console.log("获取饮食数据请求失败")
        },
        complete(res){
            if(after_function!==undefined)
            after_function(return_value)
        }
      })
    }

    static getBodyAll(userinfo, getAll, after_function){
        /* 输入参数*/
        /*
        userinfo={
                "username":"",
                "password":"",
                "jwtToken":""
            }
        */
        /* 输出参数*/
        /*
        获取成功时：
        return_value={
            "status":true,
            "bodyinfo":[{
                "username": "F.t",
                "date": "2024-05-02",
                "dietName": "0",
                "quantity": "300",
                "calories": "100"
            }]
        }
        获取失败时：
        return_value={
            "status":false
        }
        */
       let return_value = {}
       wx.request({
        url: `${FitTrackRequests.getURL_BodyGetAll()}/${getAll}`,
        method:'GET',
        headers: {  
          'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
        }, 
        data:[
          {
            "username": userinfo["username"],
            "getAll":getAll,
            "jwtToken":userinfo["jwtToken"]
          }
        ],
        success(res){
          console.log(res.data)
          if(res.data.code == 1){
            return_value={
                "status":true,
                "bodyinfo":{
                    "username":res.data["data"]
                }
            }
          }
          else{
            console.log("未找到数据")
          }
        },
        fail(res){
            return_value={
                "status":false
            }
          console.log("获取身体数据请求失败")
        },
        complete(res){
            if(after_function!==undefined)
            after_function(return_value)
        }
      })
    }
}
module.exports = FitTrackRequests