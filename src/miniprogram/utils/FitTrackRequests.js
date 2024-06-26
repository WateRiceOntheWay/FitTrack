// FitTrackRequests.js
const FitTrackStorage = require('./FitTrackStorage');
// const FormData = require('wx-formdata-master/formData');
class FitTrackRequests{
    static url_base="http://10.16.203.179:8080"
    static sport_get_all = "/sports"
    static diet_get_all = "/diet" 
    static body_get_all = "/healthcare"
    static sport_add = "/sports/add"
    static diet_add = "/diet/add"
    static body_add = "/healthcare/add"
    static login = "/login"
    static signup = "/signup"

    static summarize = "/summarize"

    static changeAvatar = "/user/putimage" // TODO

    static getAvatar = "/user/getimage" // TODO
    static username=""
    static jwtToken=""
    static openid=""
	constructor(name){
        // TODO 是否每一次请求都需要重新获取用户信息？
  }
  static InitUserInfo(after_function){
    FitTrackStorage.getUserInfo(function(result){
      if(result["status"]) {
          FitTrackRequests.username = result["value"]["username"]
          FitTrackRequests.jwtToken = result["value"]["jwtToken"]
      }
      else{
          wx.redirectTo({
            url:"/pages/login/login"
          })
          console.log(result)
          console.log("未登录，跳转到登录页面")
      }
      after_function();
  })
  }
	static getURL_SportGetAll(){
    //localhost:8080/diet?username=F.t&getAll=True
    let url = FitTrackRequests.url_base + FitTrackRequests.sport_get_all +'?' +"username="+FitTrackRequests.username + "&getAll="
    console.log(url)
		return url
	}
	static getURL_DietGetAll(){
    let url = FitTrackRequests.url_base +  FitTrackRequests.diet_get_all +'?' +"username="+FitTrackRequests.username + "&getAll="
    console.log(url)
		return  url
	}
	static getURL_BodyGetAll(){
    let url = FitTrackRequests.url_base +  FitTrackRequests.body_get_all + '?' +"username="+FitTrackRequests.username + "&getAll="
    console.log("饮食")
    console.log(url)
		return  url
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
    static getURL_Summarize(){
        return  FitTrackRequests.url_base +  FitTrackRequests.summarize
    }

    static getURL_ChangeAvatar(){
        return FitTrackRequests.url_base + FitTrackRequests.changeAvatar
    }

    static getURL_GetAvatar(){
        return FitTrackRequests.url_base + FitTrackRequests.getAvatar
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
       FitTrackRequests.InitUserInfo(function(){
        wx.request({
          url: `${FitTrackRequests.getURL_SportAdd()}`,
          method:'POST',
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
            if(res&&res.data&&res.data.code == 1)
            {
              return_value={
                "status":true,
                "value":{
                    "calories":res.data["data"]["calories"]
                }
            }
            console.log("添加成功")
            }
            else{
              return_value={
                "status":false
              }
              console.log("添加失败")
            }
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
        })})
        
        /*



        返回值解释：
        1. 添加成功时：                             */
        /*
          return {
            "status":true,
            "value":{
                "calories":123
            }
        };
         */
        //这里默认返回一个true，用来在其他测试中使用
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
       FitTrackRequests.InitUserInfo(function(){
       wx.request({
         url: FitTrackRequests.getURL_DietAdd(),
         header:{
            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
         },
         method:'POST',
         data:{
            "username":FitTrackRequests.username,
            "foodName":diet_info["type"],
            "weight":diet_info["amount"]
         },
         success(res){
           if(res&&res.data&&res.data.code == 1)
           {
            return_value={
              "status":true,
              "value":{
                  "calories":res.data["data"]["calories"]
              }
          }
          console.log("成功添加食物")
           }
            else{
              return_value={
                "status":false
              }
              console.log("添加失败")
            }
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
       })})
        /*
        返回值解释：
        1. 添加成功时：                             */
       /* return {
            "status":true,
            "value":{
                "calories":456
            }
        };
        */                                            /*
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
       FitTrackRequests.InitUserInfo(function(){
       wx.request({
         url: FitTrackRequests.getURL_BodyAdd(),
         method:'POST',
         headers: {  
            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
          },
          data:{
             "username": FitTrackRequests.username,
              "weight":body_info["weight"],
              "bodyFatRate":body_info["bfp"],
              "heartRate":body_info["heartrate"]
          },
          success(res){
            if(res&&res.data&&res.data.code == 1)
            {
              return_value={
                "status":true
              }
              console.log("身体指标添加成功")
            }
             
          },
          fail(res){
              return_value={
                  "status":false
              }
              console.log("添加身体失败")
          },
          complete(res){
              if(after_function!==undefined)
              after_function(return_value)
          }
       })})
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
   FitTrackRequests.InitUserInfo(function(){
     console.log("进入登录请求")
   wx.request({
    url: FitTrackRequests.getURL_Login(),
    method:'POST',
    data:{
      "username":login_info["username"],
      "password":login_info["password"]
    },
    success(res){
      console.log("HEAR1")
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
            console.log("HEAR2")
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
        console.log("HEAR3")
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
  })})
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
   FitTrackRequests.InitUserInfo(function(){
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
  })})
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
   let getAll_b = (getAll == "true")
   
   FitTrackRequests.InitUserInfo(function(){
   wx.request({
    url: `${FitTrackRequests.getURL_SportGetAll()}${getAll}`,
    method:'GET',
    headers: {  
      'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
    }, 
    data:[
      {
        "username": FitTrackRequests.username,
        "getAll":getAll_b,
      }
    ],
    success(res){
      console.log(res.data)
      if(res&&res.data&&res.data.code == 1){
        return_value={
            "status":true,
            "sportinfo":res.data["data"]
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
  })})
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
       let getAll_b = (getAll == "true")
       
       FitTrackRequests.InitUserInfo(function(){
        console.log("测试")
        console.log(`${FitTrackRequests.getURL_DietGetAll()}${getAll}`)
        console.log({
         "username": FitTrackRequests.username,
         "getAll":getAll_b,
       })
       wx.request({
         
        url: `${FitTrackRequests.getURL_DietGetAll()}${getAll}`,
        method:'GET',
        headers: {  
          'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
        }, 
        data:[
          {
            "username": FitTrackRequests.username,
            "getAll":getAll_b,
          }
        ],
        success(res){
          console.log(res.data)
          if(res&&res.data&&res.data.code == 1){
            return_value={
                "status":true,
                "dietinfo":res.data["data"]
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
      })})
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
       let getAll_b = (getAll == "true")
       FitTrackRequests.InitUserInfo(function(){
       wx.request({
        url: `${FitTrackRequests.getURL_BodyGetAll()}${getAll}`,
        method:'GET',
        headers: {  
          'Authorization': `Bearer ${FitTrackRequests.jwtToken}`  
        }, 
        data:[
          {
            "username": FitTrackRequests.username,
            "getAll":getAll_b,
          }
        ],
        success(res){
          console.log("从服务器获取的身体数据")
          console.log(res.data)
          if(res&&res.data&&res.data.code == 1){
            return_value={
                "status":true,
                "bodyinfo":res.data["data"]
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
      })})
    }

    static getSummarize(after_function){
        let return_value = {}
        FitTrackRequests.InitUserInfo(function(){
        wx.request({
            url: FitTrackRequests.getURL_Summarize(),
            method:'POST',
            headers: {
                'Authorization': `Bearer ${FitTrackRequests.jwtToken}`
            },
            data:
                {
                    "username": FitTrackRequests.username
                },
            success(res){
                console.log(res.data)
                if(res&&res.data&&res.data.code == 1&&res.data.data!==undefined){
                    return_value={
                        "status":true,
                        "summarize":res.data.data
                    }
                }
                else{
                    console.log("未找到数据")
                    return_value={
                        "status":false
                    }
                }
            },
            fail(res){
                return_value={
                    "status":false
                }
                console.log("获取总结数据请求失败")
            },
            complete(res){
                if(after_function!==undefined)
                after_function(return_value)
            }
        })})
    }

    static async getPostAll() {
      var result = {};
      var posts = 0;
      var likes = 0;
      var comments = 0;
      try {
          const loginRes = await wx.cloud.callFunction({
              name: 'login'
          });
          FitTrackRequests.openid = loginRes.result.openid;
  
          const db = wx.cloud.database();
          const MAX_LIMIT = 20;
          let countResult = await db.collection('circle').where({
              _openid: FitTrackRequests.openid
          }).count();
          const total = countResult.total;
          const batchTimes = Math.ceil(total / MAX_LIMIT);
  
          let tasks = [];
          for (let i = 0; i < batchTimes; i++) {
              const promise = db.collection('circle').where({
                  _openid: FitTrackRequests.openid
              }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
              tasks.push(promise);
          }
  
          let responses = await Promise.all(tasks);
          console.log("responses: ",responses)
          console.log("total: ", total, "batchTimes: ", batchTimes)
          let info = responses.reduce((acc, cur) => {
              return { data: acc.data.concat(cur.data) };
          }, { data: [] });
  
          posts = info.data.length;
          info.data.forEach(post => {
              comments += post.comments.length;
              likes += post.zans.length;
          });
  
          result = {
              posts: posts,
              likes: likes,
              comments: comments
          };
      } catch (err) {
          console.error("查询失败，错误如下：");
          console.error(err);
      }
      return result;
  }

  
    static ChangeAvatar(username,after_function){
        let return_value = {}
        let avatar_file_path = null
        FitTrackRequests.InitUserInfo(function(){
            wx.chooseMedia({
                count: 1,
                mediaType: ['image'],
                sourceType: ['album', 'camera'],
                success(res){
                    wx.showToast({
                        title: '上传中',
                        icon: 'loading',
                        duration: 10000
                    })
                    console.log(res);
                    avatar_file_path = res.tempFiles[0].tempFilePath;
                    let fd = new FormData();
                    fd.append('username',FitTrackRequests.username);
                    fd.appendFile('image',avatar_file_path);
                    const data = fd.getData();
                    console.log(fd.getData());
                    wx.request({
                        url: FitTrackRequests.getURL_ChangeAvatar(),
                        method:'POST',
                        headers:{
                            'Authorization': `Bearer ${FitTrackRequests.jwtToken}`,
                            "Content-Type":data.contentType
                        },
                        data:[data.buffer],

                        // TODO
                        success(res){
                            console.log(res);
                            wx.showToast({
                                title: '上传成功',
                                icon: 'success',
                                duration: 1000
                            })
                            return_value={
                                "status":true
                            }
                        },
                        fail(){
                            wx.showToast({
                                title: '上传失败',
                                icon: 'error',
                                duration: 1000
                            });
                            return_value={
                                "status":false
                            }
                        },
                        complete(){
                            if(after_function!==undefined){
                                after_function(return_value);
                            }
                        }
                    })
                },
                fail(res){
                    return_value={
                        "status":false
                    };
                },
                complete(res){
                    if(after_function!==undefined){
                        after_function(return_value);
                    }
                }
            })
        })
    }

    static GetAvatarUrl(username,after_function){
        let return_value = {}
        FitTrackRequests.InitUserInfo(function(){
            wx.request({
                url: FitTrackRequests.getURL_GetAvatar(),
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${FitTrackRequests.jwtToken}`
                },
                data:{
                    "username":username
                },
                success(res){
                    return_value={
                        "status":true,
                        "data":res.data["data"]
                    }
                },
                fail(){
                    return_value={
                        "status":false
                    }
                },
                complete(){
                    if(after_function!==undefined){
                        after_function(return_value);
                    }
                }
            })
        })
    }
}
module.exports = FitTrackRequests