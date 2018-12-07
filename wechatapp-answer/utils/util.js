const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  let current = wx.Bmob.User.current();
  let uid = current.objectId;
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 保存用户头像昵称
 * avatarUrl：头像
 * nickName:昵称
 */
const changeUserInfo = (avatarUrl, nickName) => {
  let current = wx.Bmob.User.current();
  let uid = current.objectId;
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      res.set('avatarUrl', avatarUrl);
      res.set('nickName', nickName);
      res.save();
      resolve({
        'result': 'success'
      });
    })
  })
}

/**
 * 获取套题
 */
const getQuestionMenu = () => {
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questionMenu');
    query.order('createdAt');
    query.find().then(res => {
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 获取题目
 * menuId:套题id
 */
const getQuestions = (menuId) => {
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questions');
    query.equalTo('menu','==',menuId);
    query.find().then(res=>{
      resolve({
        'result':res
      })
    })
  })
}

/**
 * 获取设置
 */
const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('setting')
    query.find().then(res=>{
      resolve({
        'result':res
      })
    })
  })
}

/**
 * 添加测试记录
 * menu:套题id
 * score:分数
 * questionList:问题集合
 */
const addHistory = (menu, score, questionList, questionMenu)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('history')
    query.equalTo('menu','==',menu)
    query.find().then(res=>{
      if(res.length>0){
        query.get(res[0].objectId).then(res1=>{
          res1.set('score',score)
          res1.set('questionList',questionList)
          res1.save().then(res2=>{
            resolve({ 'result': true })
          })
        })
      }else{
        let current = wx.Bmob.User.current();
        let uid = current.objectId;
        const pointer = wx.Bmob.Pointer('_User')
        const poiID = pointer.set(uid)
        query.set('user',poiID)
        query.set('score',score)
        query.set('menu',menu)
        query.set('questionMenu', questionMenu)
        query.set('questionList',questionList)
        query.save().then(res2=>{
          resolve({'result':true})
        })
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  changeUserInfo: changeUserInfo,
  getQuestionMenu: getQuestionMenu,
  getQuestions: getQuestions,
  getSetting: getSetting,
  addHistory: addHistory
}