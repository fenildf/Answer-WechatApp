// pages/answer/index.js
import { $wuxCountDown } from '../../wux/index'
Page({

  data: {
    loading:true,//加载中
    result:{}, //题目
    total:0,//题目总总数
    percent:20,//进度条百分比
    time:45,//时间
    Countdown:'',//倒计时
    s: ['A. ', 'B. ', 'C. ', 'D. ', 'E. '],
  },

  onLoad (e) {
    //获取题目
    wx.u.getQuestions(e.id).then(res=>{
      console.log(res);
      this.setData({
        result:res.result,
        total:res.result.length
      })
      //倒计时
      var Countdown = new $wuxCountDown({
        date: +(new Date) + 60000 * parseInt(this.data.time),
        render(date) {
          const min = this.leadingZeros(date.min, 2) + ':'
          const sec = this.leadingZeros(date.sec, 2) + ''
          this.setData({
            Countdown: min + sec,
          })
        }
      })

      this.setThisData(0)
    })
  },
  //设置当前题目
  setThisData(i){
    const r = this.data.result
    const that = this;
    console.log(r.length)
    if (r.length == 0) {
      wx.redirectTo({
        url: '/pages/answerErr/index',
      })
      return
    }

    const current = r[i].choseList[0].item

    const answer = [];
    //获取正确答案
    for(var j = 0;j<r[i].choseList.length;j++){
      if(r[i].choseList[j].isChose){
        answer.push(r[i].choseList[j].item);
      }
    }
    console.log(answer);

    this.setData({
      questionInfo:r[i],
      answer:answer,
    })
  }
})