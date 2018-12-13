// pages/wrongAnswer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    questionInfo:{},
    s: ['A. ', 'B. ', 'C. ', 'D. ', 'E. '],
    showAnswer:false,
  },

  onLoad: function (options) {
    var menu = options.menu
    wx.u.getError(menu).then(res=>{
      console.log(res)
      this.setData({
        result: res.error,
        loading:false,
        questionInfo:res.error[0].questionList[0]
      })
    })
  },
  showAnswer(){
    this.setData({
      showAnswer:true
    })
  }
})