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
    disabled:true,
    index:0,
    chose:[]
  },

  onLoad (options) {
    var objectId = options.objectId
    wx.u.getHistory(objectId).then(res => {
      console.log(res)
      this.setData({
        loading:false,
        result:res.result
      })
      this.setThisData(this.data.index)
    })   
  },
  setThisData(i){
    console.log(i)
    const r = this.data.result.questionList
    const answer = []
    var current = "";
    var currentD = [];
    console.log(r)
    for(var j=0;j<r[i].choseList.length;j++){
      
      if(r[i].choseList[j].isChose){
        answer.push(this.data.s[j] + r[i].choseList[j].item)
      }
    }
    this.setData({
      current: current,
      currentD: currentD,
      questionInfo: r[i],
      answer: answer,
      total: r.length
    })
    console.log(this.data.current)
  },
  handlePageChange({ detail }){
    const action = detail.type;
    const r = this.data.result.questionList
    
    
    if (action === 'next') {
      this.setThisData((this.data.index +1));
      this.setData({
        index: (this.data.index + 1),
      })
    } else {
      this.setThisData((this.data.index - 1));
      this.setData({
        index: (this.data.index - 1),
      })
    }
  }
})