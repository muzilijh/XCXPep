const api = require('../../resources/config/api.js');

const apiDrug = require('../../../drugInformation/resources/config/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoYBL: false,
    phStores: [],
    showLoading: true,
    shopidLists: ['MD20190516144843000004', 'MD20190522160259000006'], // 测试
    yblId:"MD20181129144518000006",
    // shopidLists: [
    //   'MD20190428155832000006',
    //   'MD20190429120940000011',
    //   'MD20190709152933000003',
    //   'MD20190812094851000024',
    //   'MD20190812103310000025',
    //   'MD20190812115516000027',
    //   'MD20190812140634000028',
    //   'MD20190812141817000029',
    //   'MD20190812144012000031',
    //   'MD20190813104932000033',
    //   'MD20190813110354000034',
    //   'MD20190909104346000002',
    //   'MD20190909144333000004',
    //   'MD20190909165726000006',
    //   'MD20190909170824000007',
    //   'MD20190909174521000009',
    //   'MD20190909175554000010',
    //   'MD20190909181118000012',
    //   'MD20190909182440000013',
    //   'MD20190909183021000014',
    //   'MD20190916103520000019',
    //   'MD20190916112945000021',
    //   'MD20190916140341000024',
    //   'MD20190916141001000025',
    //   'MD20190916150248000028',
    //   'MD20190916162650000001',
    //   'MD20190916163236000002',
    //   'MD20190916164907000003',
    //   'MD20190916165951000005',
    //   'MD20190916171935000007',
    //   'MD20190916173853000011',
    //   'MD20190916174518000012',
    //   'MD20190916175723000014',
    //   'MD20190916181053000016'], // 生产环境
    // yblId: "MD20190920154507000324",

    yblShow: false,



    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '我的服务门店', //导航栏 中间的标题
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




  //导航到店
  navMapTap: function (e) {
    let locName = e.currentTarget.dataset.name;
    console.log('re..e', e)//39.962968,116.463823
    let lat = parseFloat(e.currentTarget.dataset.lat);
    let lng = parseFloat(e.currentTarget.dataset.lng);
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: locName,
      scale: 16
    })
  },


  // 获取最近服务门店
  getPhLastagent: function () {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    let link = apiDrug.getPhLastagent + '/' + wx.getStorageSync('logInfo').openId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
      console.log('res', res)
      if(res.id){
        this.getPhstoreById(res.id)
        this.setData({
          showGoYBL: res.o2oSerivce == 1 ? true : false,
        })
        if (res.id == this.data.yblId){
          this.setData({
            yblShow: true
          })
        }
      } else {
        this.setData({
          showLoading: false
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },



  // 查询指定门店
  getPhstoreById: function (id) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    let link = apiDrug.getPhstoreById + '/' + id;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
      console.log('res', res)
      let phStores = []
      if (res.agentId) {
        phStores.push(res)
      }
      this.setData({
        phStores: phStores
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
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },



  // 咨询药师
  goPharCoun: function(e){
    console.log('...343', e)
    let phStore = e.currentTarget.dataset
    wx.reLaunch({
      url: "/page/drugInformation/pages/pharCounseling/pharCounseling?id=" + phStore.id + '&name=' + phStore.name + '&o2oSerivce=' + phStore.o2oserivce,
    })
  },

  // 小程序跳转
  goMiniP: function (e) {
    console.log('e', e)
    let agentId = e.currentTarget.dataset.id
    let shopidLists = this.data.shopidLists
    console.log('panduan', shopidLists.indexOf(agentId))
    if (shopidLists.indexOf(agentId) >= 0){
      console.log('包含')
      wx.navigateToMiniProgram({
        appId: 'wx16ed9a8bbb188228',
        path: '',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        },
        fail(res) {
          console.log('fail', res)
        }
      })
    } else {
      wx.navigateTo({
        url: "../defaultStore/defaultStore",
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhLastagent()
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