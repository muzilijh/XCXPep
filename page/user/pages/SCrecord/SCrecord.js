
const api = require('../../resources/config/api.js');
const apiDrug = require('../../../drugInformation/resources/config/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordCodeLists: [],
    productLists: [],

    showLoading: true,
    

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '扫码用药记录', //导航栏 中间的标题
      },
      //右下侧
      toolbarData: {
        showTool: 1,//1表示显示    0表示不显示
        hideCount: app.globalData.hideCount
      },
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

  },

  // 获取扫码记录69码
  getPhRecord: function () {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    let link = apiDrug.getPhRecord + '/' + wx.getStorageSync('logInfo').openId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      
      console.log('recordCodeLists', res)
      this.setData({
        recordCodeLists: res
      })
      if(this.data.recordCodeLists.length>0){
        this.getGoodsByGode()
      } else {
        setTimeout(function () {
          wx.hideToast();
        }, 500)
        this.setData({
          showLoading: false
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => {
      
    }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 根据69码搜索药品 
  getGoodsByGode: function () {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    let link = apiDrug.GetDrug + '?barCodes=' + this.data.recordCodeLists;
    let header = { }
    let obj = {};
    let than = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
      console.log('...s.', res)
      this.setData({
        productLists: res.rows
      })
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => {
      this.setData({
        showLoading: false
      })
    }
    app.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);
  },

  // 点击跳转到用药视频页面
  goInformation: function (e) {
    console.log('goInformation', e.currentTarget.dataset)
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "/page/drugInformation/pages/information/information?code=" + code,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhRecord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})