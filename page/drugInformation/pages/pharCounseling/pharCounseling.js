const api = require('../../resources/config/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIcon: api.imageIcon,
    
    phAgentId:'',
    phAgentName: '',
    phAgentList: [],
    cellPhone:'',
    showPhone: false,


    showGoYBL: false,
    
    showLoading: true,

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '药师咨询', //导航栏 中间的标题
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



  // 获取最近服务门店
  getPhLastagent: function () {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    let link = api.getPhLastagent + '/' + wx.getStorageSync('logInfo').openId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
      console.log('res', res)
      this.setData({
        phAgentId: res.id,
        phAgentName: res.name,
        showGoYBL: res.o2oSerivce == 1 ? true : false,
      })
      this.getPhAgentById()
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 获取药师列表
  getPhAgentById: function(){
    let link = ''
    if (this.data.phAgentId){
      link = api.getPhAgentById + '/' + this.data.phAgentId;
    } else {
      link = api.getPhAgentById;
    }
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      console.log('phAgent', res)
      this.setData({
        phAgentList: res
      })
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => {
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
      this.setData({
        showLoading: false
      })
    }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 点赞
  giveLike: function(e){
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 2000
    })

    let pharId = e.currentTarget.dataset.pharid
    let link = api.giveLike + '/' + pharId + "?openID=" + wx.getStorageSync('logInfo').openId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = { };
    let than = res => {
      console.log('giveLike', res)
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      this.getPhAgentById()
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 拨打电话
  cellPhar: function(e){
    console.log('ree', e)
    this.setData({
      showPhone: true,
      cellPhone: e.currentTarget.dataset.cellphone
    })
  },
  cell: function(){
    app.callEmx(this.data.cellPhone)
    this.setData({
      showPhone: false
    })
  },
  cellClose: function(){
    this.setData({
      showPhone: false,
      cellPhone: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phAgentId = ''
    let phAgentName = ''

    wx.showLoading({
      title: '加载中',
    })

    //登陆
    let succss = res => {
      if (options.id) {
        console.log('1')
        this.setData({
          phAgentId: options.id,
          phAgentName: options.name,
          showGoYBL: options.o2oSerivce == 1 ? true : false,
        })
        this.getPhAgentById()
      } else {
        this.getPhLastagent()
      }
    }
    app.APPlogin(succss)

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