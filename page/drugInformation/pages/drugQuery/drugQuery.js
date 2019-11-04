// page/drugInformation/pages/drugQuery/drugQuery.js

const api = require('../../resources/config/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    onLogQuery: false,
    grugLists: [],
    pageNo: 1,
    showLoading: false,
    loading: false,
    focus: true,
    noLists: false, //查询无数据
    totlaPage: 0, // 页码总数
    topFixed: false, // 头部搜索固定
    drugListLog: [], // 查询记录

    hotListLog: ['感冒','儿童','咳嗽','消炎','皮肤','痔疮','避孕','退热贴','清热解毒','藿香正气水'],


    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '搜索药品', //导航栏 中间的标题
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

  //扫码
  codeScan: function () {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (/^[0-9]+$/.test(res.result)) {
          console.log('code60', res.result)
          let code = res.result
          if (code) {
            wx.navigateTo({
              url: "/page/drugInformation/pages/information/information?code=" + code + "&actOrigin=BarCode",
            })
          } else {
            wx.showToast({
              title: '69码识别失败，请重试！',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          let url = res.result.toString();
          let arrObj = url.split("?");
          let path = '';
          if (arrObj.length > 1) {
            let arrPara = arrObj[1].split("&");
            let arr;
            for (var i = 0; i < arrPara.length; i++) {
              arr = arrPara[i].split("=");
              console.log(arr)
              if (arr != null) {
                if (arr[0] == 'code') {
                  console.log('code', arrObj)
                  path = arrObj[1];
                  wx.navigateTo({
                    url: "/page/drugInformation/pages/information/information?" + path + "&actOrigin=QRCode",
                  })
                } else if (arr[0] == 'id') {
                  console.log('id', arrObj)
                  path = arrObj[1];
                  console.log('...id', path)
                  wx.navigateTo({
                    url: "/page/drugInformation/pages/videoList/videoList?" + path,
                  })
                } else if (arr[0] == 'watchGuide') {
                  console.log('watchGuide', arrObj)
                  wx.navigateTo({
                    url: "/page/drugInformation/pages/watchGuide/watchGuide",
                  })
                } else if (arr[0] == 'searchIndex') {
                  console.log('searchIndex', arrObj)
                  wx.reLaunch({
                    url: "/page/drugInformation/pages/searchIndex/searchIndex",
                  })
                }
              }
            }
          }
          else {
            wx.showToast({
              title: '识别失败，请重试！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
    })
  },
  // 清除缓存
  cleanLog: function(){
    this.setData({
      drugListLog: []
    })
    wx.setStorageSync('drugListLog', this.data.drugListLog);
  },
  bindKeyInput: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })
    if (!this.data.onLogQuery) {
      this.setData({
        inputValue: e.detail.value
      })
    }
  },
  // 缓存记录查询
  logQuery: function (e) {
    console.log('e', e.currentTarget.dataset.item)
    this.setData({
      onLogQuery: true,
      inputValue: e.currentTarget.dataset.item
    })
    this.buttonQuery()
  },
  // 查询
  buttonQuery: function(){
    this.setData({
      grugLists:[],
      showLoading: true,
      pageNo: 1,
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
    console.log('...', this.data.grugLists)
    this.queryProductVoPlus()

    let drugListLog = this.data.drugListLog
    let inputValue = this.data.inputValue
    if (inputValue){
      if (drugListLog.includes(inputValue)){
        let index = drugListLog.indexOf(inputValue);
        console.log('...index', index)
        drugListLog.splice(index, 1);
        drugListLog.unshift(inputValue)
      } else {
        if (drugListLog.length>5){
          drugListLog.pop()
          drugListLog.unshift(inputValue)
        } else {
          drugListLog.unshift(inputValue)
        }
      }

    }
    console.log('..drugListLog', drugListLog)
    wx.setStorageSync('drugListLog', drugListLog);
    this.setData({
      drugListLog: drugListLog
    })
  },
  // 继续加载
  queryProductVoPlus: function(){
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    if (this.data.loading){
      return
    }
    this.setData({
      loading: true
    })
    wx.request({
      url: api.GetProductVoPlus,
      method: 'GET',
      data:{
        pageNo: this.data.pageNo,
        pageSize: 10,
        searchKey: this.data.inputValue,
        prodType: ''
      },
      success: res => {
        console.log('getDrugInformation', res)
        if (res.statusCode == 200) {
          setTimeout(function () {
            wx.hideToast();
          }, 500)
          if (res.data.code == 200) {
            let lists = res.data.data.rows ? res.data.data.rows : []
            let onlists = this.data.grugLists
            let newlists = onlists.concat(lists)
            let totlaPage = Math.ceil(res.data.data.total / 10)
            console.log('lists', lists)
            console.log('onlists', onlists)
            console.log('newlists', newlists)
            console.log('totlaPage', totlaPage)
            this.setData({
              grugLists: newlists,
              totlaPage: totlaPage
            })
            if (newlists.length == 0){
              this.setData({
                noLists: true,
              })
            } else {
              this.setData({
                noLists: false,
              })
            }
          }
        }
      },
      complete: res=>{
         this.setData({
           loading: false,
           onLogQuery: false,
        })
      }
    })
  },
  // 清空查询记录
  cleanList: function(){
    console.log(',,,')
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })

    this.setData({
      inputValue: '',
      grugLists: [],
      totlaPage: 0,
      noLists: false
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      drugListLog: wx.getStorageSync('drugListLog') || []
    })
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
    if (!this.data.showLoading || this.data.pageNo >= this.data.totlaPage){
      return
    }
    console.log('...')
    let pageNo = this.data.pageNo
    this.setData({
      pageNo: pageNo + 1
    })
    this.queryProductVoPlus()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //滚动监控
  onPageScroll: function (e) {
    console.log('e', e)
    if (e.scrollTop >= 30) {
      console.log('固定')
      this.setData({
        topFixed: true
      })
    } else {
      this.setData({
        topFixed: false
      })
    }
  },
})