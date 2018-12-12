// pages/analysis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: ['A. ', 'B. ', 'C. ', 'D. ', 'E. '],
    questionInfo:{},
    loading: true,
    result:{},
    disabled:true
  },

  onLoad (options) {
    var objectId = options.objectId
    wx.u.getHistory(objectId).then(res => {
      console.log(res)
      this.setData({
        loading:false,
        result:res.result
      })
      this.setThisData(0)
    })   
  },
  setThisData(i){
    const r = this.data.result.questionList
    const answer = []
    console.log(r)
    for(var j=0;j<r[i].choseList.length;j++){

      if(r[i].choseList[j].isChose){
        answer.push(this.data.s[j] + r[i].choseList[j].item)
      }
    }
    console.log(answer)
    this.setData({
      questionInfo: r[i],
      current:r[i].choose,
      currentD:r[i].choose[0],
      answer:answer
    })
  }
})