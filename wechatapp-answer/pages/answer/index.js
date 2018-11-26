// pages/answer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad (e) {
    console.log(e.id);
    wx.u.getQuestions(e.id).then(res=>{
      console.log(res);
    })
  },
})