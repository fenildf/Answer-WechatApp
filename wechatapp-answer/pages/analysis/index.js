// pages/analysis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    result:{}
  },

  onLoad (options) {
    var objectId = options.objectId
    wx.u.getHistory(objectId).then(res => {
      console.log(res)
      this.setData({
        loading:false,
        result:res.result
      })
    })
  }
})