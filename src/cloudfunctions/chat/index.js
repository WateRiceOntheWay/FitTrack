// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'fittrack-7gp6es5nf242fb26'
})

// 云函数入口函数
exports.main = async(event, context) => {
	console.log("进入调用")
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const {
    type,
    userInfo,
    collectionname,
    data //{_id,username}
  } = event;
  const log = cloud.logger()
  const loveCollection = db.collection(collectionname);
  log.info({
	  name:"测试日志",
	  type:type
  })
  try {
    switch (type) {
      case "zan":
      console.log("开始点赞")
      loveCollection.doc(data._id).update({
        data: {
          zans: _.push({
            openid: wxContext.OPENID,
            name: data.username,
            createTime: db.serverDate()
          }),
          test: {
            test: "测试返回"
          }
        }
      })
      .then(res => {
        console.log("点赞成功", res)
        return res
      })
      .catch(err => {
        console.error("点赞失败", err)
        return {
          code: 500,
          message: 'Internal server error',
          error: err
        }
      })
      break


      case "comment":
        return await loveCollection.doc(data._id).update({
          data: {
            comments: _.push({
              openid: wxContext.OPENID,
              comment: data.comment,
              createTime: db.serverDate(),
              username: data.username,
              userInfo: data.userInfo,
              toName: data.toName
            })
          }
        })
        break
      case "delete":
        const result = await cloud.deleteFile({
          fileList: data.fileIDs,
        })
        return await loveCollection.doc(data._id).remove()
        break
      case "top":
        return await loveCollection.doc(data._id).update({
          data: {
            isTop: data.isTop
          },
        })
        break
      default:
        return {
          code: 400,
          message: 'Invalid type'
        }
    }
  } catch (e) {
	  console.log("出错啦！！！")
    console.error(e)
    return {
      code: 500,
      message: 'Internal server error',
      error: e
    }
  }
}


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }