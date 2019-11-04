const api = require('../../resources/config/api.js');
const guideApi = require('../../../drugInformation/resources/config/api.js');
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userInfo: wx.getStorageSync('userInfo'),
    haveStore: false,

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '我的', //导航栏 中间的标题
      },
      //右下侧
      toolbarData: {
        showTool: 1,//1表示显示    0表示不显示
        hideCount: app.globalData.hideCount,
        isTabBar: 1,
      },
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let succss = res => {
      let succssUser = res => {
        console.log('succssUser', res)
        this.setData({
          userInfo: res
        })
      }
      app.getUserContent(succssUser)
    }
    app.APPlogin(succss);

    wx.hideShareMenu()


    console.log('wewe', Math.random(0,1))
    
    
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

  },


  goOtherMini: function () {
    wx.navigateToMiniProgram({
      appId: 'wxd947200f82267e58',
      path: 'pages/wjxqList/wjxqList?activityId=47256204',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },

  goTXMini: function () {
    wx.navigateToMiniProgram({
      appId: 'wxebadf544ddae62cb',
      path: 'pages/survey/index?sid=4770505&hash=356b',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  }
})