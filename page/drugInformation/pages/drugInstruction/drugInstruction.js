const api = require('../../resources/config/api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '用药指导', //导航栏 中间的标题
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

  //用药视频合集
  getCategorys: function () {
    let link = api.getCategorys;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      if (res.code == 200) {
        this.setData({
          videoClassify: res.data
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 跳转到科学观看用药视频指南页面
  goWatchGuide: function (e) {
    wx.navigateTo({
      url: "/page/drugInformation/pages/watchGuide/watchGuide"
    })
  },
  // 视频搜索列表页
  goSearchIndex: function () {
    wx.reLaunch({
      url: "/page/drugInformation/pages/searchIndex/searchIndex",
    })
  },
  //查看用药合集列表
  goVideoLists: function (e) {
    console.log('goVideoLists.e', e)
    let id = e.currentTarget.dataset.id
    let cname = e.currentTarget.dataset.cname
    wx.navigateTo({
      url: "/page/drugInformation/pages/videoList/videoList?id=" + id + '&cname=' + cname,
    })
  },
  //code查看单个用药视频
  goInformation: function (e) {
    console.log('goInformation.e', e)
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "/page/drugInformation/pages/information/information?code=" + code,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategorys()
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