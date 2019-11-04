// page/drugInformation/pages/drugQuery/drugQuery.js

const api = require('../../resources/config/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grugLists: [],
    pageNum: 1,
    pageSize: 10,
    totalPage: 0, // 页码总数

    categoryId: '',

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '药品分类', //导航栏 中间的标题
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

  navTab: function(e){
    console.log('eee', e)
    this.setData({
      categoryId: e.currentTarget.dataset.navid,
      'barData.navbarData.title': e.currentTarget.dataset.name
    })
    this.setData({
      pageNum: 1,
      grugLists: [],
      totalPage: 0, // 页码总数
    })
    this.getProductByCId()

    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },

  // 搜索药品页面
  goDrugQuery: function() {
    wx.navigateTo({
      url: "../drugQuery/drugQuery",
    })
  },

  
  // 点击跳转到用药视频页面
  goInformation: function (e) {
    console.log('goInformation', e.currentTarget.dataset)
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: "../information/information?code=" + code,
    })
  },

  moreBtn: function (e) {
    this.setData({
      moreNav: !this.data.moreNav
    })
  },


  // 根据分类id获取药品列表
  getProductByCId: function(){
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 50000
    })

    this.setData({
      showLoading: true,
    })

    let link = api.getProductByCId + '/' + this.data.categoryId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    };
    let than = res => {
      if (res.code == 200) {
        console.log('res', res)
        let lists = res.data.rows ? res.data.rows : []
        let onlists = this.data.grugLists
        let newlists = onlists.concat(lists)
        let totlaPage = Math.ceil(res.data.total / this.data.pageSize)

        this.setData({
          grugLists: newlists,
          totalPage: totlaPage,
          showLoading: false
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
    }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },



  // 根据一级分类id查询二级分类---一级分类id写死固定
  getCategoryListById: function () {
    let link = api.getCategoryListById + '?categoryId=0a6ca86880784e6e8bd78269cf3aac08';
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      if (res.code == 200) {
        console.log('res', res)
        this.setData({
          tagLists: res.data
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

    console.log('options-list', options)
    this.setData({
      categoryId: options.categoryId,
      catName: options.catName
    })
    this.setData({
      'barData.navbarData.title': options.catName
    })
    this.getCategoryListById()
    this.getProductByCId()
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
    if (this.data.showLoading || this.data.pageNum >= this.data.totalPage) {
      return
    }
    console.log('...')
    let pageNum = this.data.pageNum
    this.setData({
      pageNum: pageNum + 1
    })
    this.getProductByCId()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //滚动监控
  onPageScroll: function (e) {
    
  },
})