//const Page = require('../../../utils/ald-stat.js').Page;
const api = require('../../resources/config/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIcon: api.imageIcon,
    
    swiperFalse: false,
    swiperTrue: true,

    showVideo: false,

    videoindex: '',

    allClassify: [],
    proNum: 0,
    contentLists: [],
    videoUrlLists: [],
    videLoading: true,

    videoLists:[
      { id: 1, resUrl: "https://bj-dev-1257863402.cos.ap-guangzhou.myqcloud.com/videos/guide/HD/%E6%89%AB%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.mp4" },
      { id: 2, resUrl:"https://bj-dev-1257863402.cos.ap-guangzhou.myqcloud.com/videos/guide/HD/%E6%89%AB%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%9D%A1%E5%BD%A2%E7%A0%81%E7%9C%8B%E8%A7%86%E9%A2%91.mp4"},
    ],

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '视频教程', //导航栏 中间的标题
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

  // 关闭隐藏视频
  closeVideo: function () {
    this.setData({
      nowVideo: '',
      showVideo: false
    })
  },

  //点击播放
  bindplayVideo: function (e) {
    console.log('..bindplay..', e)
    let id = e.currentTarget.dataset.pid
    console.log('id', id)
    let videoindex = e.currentTarget.dataset.index;
    var videoCtx = wx.createVideoContext(id);    //获取点击的视频

    console.log('videoCtx', videoCtx)
    console.log('data.videoindex', this.data.videoindex)
    console.log('videoindex', videoindex)
    if (!this.data.videoindex) {    //没有其他视频播放时
      this.setData({
        videoindex: videoindex
      }, function () {
        console.log(',,,,')
        videoCtx.play();
      })
    } else if (videoindex == this.data.videoindex) {

    } else {    // 有其他视频正在播放
      var videoCtxPrev = wx.createVideoContext('myVideo' + this.data.videoindex); //找到当前正在播放的视频
      videoCtxPrev.pause();    //暂停
      this.setData({
        videoindex: videoindex
      }, function () {
        videoCtx.play();    //播放点击的视频
      })
    }

    if (VideoMap[videoindex]) {
    } else {
      VideoMap[videoindex] = {
        duration: 0,
        code: this.data.drugCode,
        videoID: videoindex
      }
    }
  },
  suspendedVideo: function (e) {
    console.log("suspendedVideo", e)
    let videoindex = e.currentTarget.dataset.index;
    if (this.data.videoindex == videoindex) {
      this.setData({
        videoindex: ''
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let descGoods = "您的好友给您推荐了"
    if (wx.getStorageSync('userInfo').nickname != undefined) {
      descGoods = "@" + wx.getStorageSync('userInfo').nickname + " 给您推荐了视频教程"
    }
    let shareData = {
      title: "一起看视频" + descGoods,
      path: "/page/drugInformation/pages/watchGuide/watchGuide"
    }
    return shareData
  }
})