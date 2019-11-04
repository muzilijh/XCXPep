const api = require('../../resources/config/api.js');
const userApi = require('../../../../config/apiConfig.js');
const app = getApp();
let VideoMap = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},


    drugCode: '',
    changeDesTap: '0',
    videoindex: '',
    haveDrug: '0',  // 1有数据，2无数据，0加载中

    drugInformation: {}, // 药品服务信息
    drugDetail: {}, // 药品信息
    drugInstructions: {}, // 药品说明书
    contraindications: [], // 药品禁忌

    videoLists: [],
    manuVideoList: [],

    temModel: '',

    lat: '',
    lng: '',
    actType: '', //行为分类[0:授权行为; 1:进入小程序; 2:页面间跳转(unload); 3:退出小程序(hide); 10:开始播放; 11:暂停; 12:停止播放;] ,
    currPage: '', // 当前页面
    prevPageOne: '', // 上一个页面
    actOrigin: '',

    phShow: false,
    haveStore: false,
    phStores: {},

    showGoYBL: false,
    loaddingGoMini: false,// 小程序校验限制

    questTagLists: [], // 问卷id列表

    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '商品信息', //导航栏 中间的标题
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

  // 关闭门店模版
  closePhShow: function(){
    this.setData({
      phShow: false
    })
  },

  changeDes: function (e) {
    if (this.data.videoindex) {
      var videoCtxPrev = wx.createVideoContext('myVideo' + this.data.videoindex); //找到当前正在播放的视频
      videoCtxPrev.pause();    //暂停
    }
    this.setData({
      changeDesTap: e.currentTarget.dataset.tap,
      videoindex: ''
    })
    if (e.currentTarget.dataset.tap != 0 && !this.data.drugInstructions.id) {
      this.getDrugInstructions()
    }
  },

  //点击播放
  bindplayVideo: function (e) {
    // console.log('..bindplay..', e)
    let id = e.currentTarget.dataset.pid
    let videoindex = e.currentTarget.dataset.index;
    var videoCtx = wx.createVideoContext(id);    //获取点击的视频

    // console.log('videoCtx', videoCtx)
    // console.log('data.videoindex', this.data.videoindex)
    // console.log('videoindex', videoindex)
    if (!this.data.videoindex) {    //没有其他视频播放时
      this.setData({
        videoindex: videoindex
      }, function () {
        videoCtx.play();
      })
    } else if (videoindex == this.data.videoindex) {

    }else {    // 有其他视频正在播放
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
    this.setLogPV('10', videoindex)
  },
  suspendedVideo: function (e) {
    let videoindex = e.currentTarget.dataset.index;
    if (this.data.videoindex == videoindex) {
      this.setData({
        videoindex: ''
      })
    }
    this.setLogPV('11', videoindex)
  },
  // 播放进度变化触发 250ms一次
  bindtimeupdate: function (e) {
    let id = e.currentTarget.dataset.index
    let currentTime = e.detail.currentTime

    // 已看过进度不修改
    if (VideoMap[id] && VideoMap[id] > currentTime) {
      return
    }
    VideoMap[id] = {
      duration: currentTime,
      code: this.data.drugCode,
      videoID: id
    }
    // VideoMap.duration = currentTime
    // VideoMap.videoID = id
  },
  bindended: function (e) {
    let videoindex = e.currentTarget.dataset.index;
    this.setLogPV('12', videoindex)
  },


  // 获取药品视频信息
  getDrugInformation: function () {
    console.log('manufacturer', this.data.drugDetail)
    wx.showLoading({
      title: '加载中',
    })
    let link = api.getDrugAllVideo
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {
      barCode: this.data.drugCode,
      manu: this.data.drugDetail.manufacturer
    };
    let than = res => {
      // console.log('Vidoes', res)
      let videoLists = []
      let textLists = []
      let audioLists = []
      let manuVideoList = []
      let newDrugInformation = {}

      setTimeout(function () {
        wx.hideLoading();
      }, 500)
      let barVideoList = res.barVideoList
      let manuVideos = res.manuVideoList
      for (let i = 0; i < barVideoList.length; i++) {
        if (barVideoList[i].resType == 0) {
          // 视频
          if (barVideoList[i].resUrl) {
            videoLists.push(barVideoList[i])
          }
        } else if (barVideoList[i].resType == 1) {
          // 音频
          audioLists.push(barVideoList[i])
        } else {
          // 文字
          if (barVideoList[i].resContent) {
            textLists.push(barVideoList[i])
          }
        }
      }

      for (let i = 0; i < manuVideos.length; i++) {
        if (manuVideos[i].resUrl) {
          manuVideoList.push(manuVideos[i])
        }
      }

      newDrugInformation = {
        videoLists: videoLists,
        audioLists: audioLists,
        textLists: textLists
      }
      console.log('newDrugInformation', newDrugInformation)
      this.setData({
        drugInformation: newDrugInformation,
        manuVideoList: manuVideoList
      })
    }
    let fail = res => {
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 获取药品信息
  getDrugDetail: function () {
    wx.showLoading({
      title: '加载中',
    })
    let link = api.GetDrug + '?barCodes=' + this.data.drugCode;
    let header = { }
    let obj = {
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      type: 0
    };
    let than = res => {
      console.log('getDrugDetail', res)
      this.setData({
        drugDetail: res.rows.length > 0 ? res.rows[0] : [],
        haveDrug: res.rows.length > 0 ? '1' : '2'   // 1有数据，2无数据，0加载中
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
      this.getDrugInformation()
    }
    let fail = res => {
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);
  },

  // 获取药品说明书
  getDrugInstructions: function () {
    wx.showLoading({
      title: '加载中',
    })
    let link = api.GetDrugMessage;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = { 
      productId: this.data.drugDetail.id
      };
    let than = res => {
      console.log('getDrugInstructions', res)
      let newData = {
        id: res.data.id,
        productProps: res.data.productProps
      }
      this.setData({
        drugInstructions: newData
      })
      let productPropsLists = res.data.productProps
      let contraindications = []
      for (let i = 0; i < productPropsLists.length; i++) {
        if ((productPropsLists[i].propName == '禁忌' ||
          productPropsLists[i].propName == '注意事项')
          && productPropsLists[i].propValue) {
          contraindications.push(productPropsLists[i])
        }
      }
      this.setData({
        contraindications: contraindications
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
    }
    let fail = res => {
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 调整options
  getOpt: function (options) {
    console.log('getOpt', options)
    // options.code = 1234534
    options.code = 6932526300866
    // options.code = 6902329052576
    // options.code =6923905536440
    // options.q = 'https%3A%2F%2Ftest.api.yaobili.com%2Fguide%2Fcode%3Fcode%3D6900372109377%26shopId%3DMD20181213092759000002'
    // MD20190808113050000023   // 没有
    // MD20190903194315000001   // ybl药店
    // MD20181213092759000002
    // options.q = 'https%3A%2F%2Ftest.api.yaobili.com%2Fguide%2Fcode%3Fcode%3D6900372109377'

    let drugCode = ''
    let shopId = ''
    if (options.code != undefined) {
      drugCode = options.code;
      shopId = options.shopId ? options.shopId:'';
      this.setData({
        actOrigin: options.actOrigin ? options.actOrigin : '',
        actType: options.actType ? options.actType : 2
      })
    } else {
      console.log(options);
      this.setData({
        actOrigin: 'QRCode',
        actType: 1
      })
      let url = JSON.stringify(decodeURIComponent(options.q)).replace(/^\"|\"$/g, '');
      // console.log('url', url)
      let arrObj = url.split("?");
      if (arrObj.length > 1) {
        let arrPara = arrObj[1].split("&");
        let arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null) {
            if (arr[0] == 'code') {
              drugCode = arr[1];
            } else if (arr[0] == 'shopId') {
              shopId = arr[1];
            }
          } else {
            wx.showModal({
              title: "提示",
              content: '二维码识别失败，请重试！',
              confirmText: "确定",
              showCancel: false,
              confirmColor: "#34c3e0",
              complete(res) {
                wx.navigateBack()
              }
            })
          }
        }
      } else {
        wx.showModal({
          title: "提示",
          content: '二维码识别失败，请重试！',
          confirmText: "确定",
          showCancel: false,
          confirmColor: "#34c3e0",
          complete(res) {
            wx.navigateBack()
          }
        })
      }
    }
    console.log('drugCode, shopId', drugCode, '---', shopId)

    if (drugCode) {
      this.setData({
        drugCode: drugCode,
        shopId: shopId
      })
      // this.getDrugInformation()
      this.getDrugDetail()
      this.getQuestTag(drugCode)
    }
    if (shopId){
      this.getPhstoreById(shopId)
    }
    // 埋点
    this.getDataStatistical()
  },
  // 获取问卷id
  getQuestTag: function (drugCode){
    let link = api.getQuestTag;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {
      content: drugCode
    };
    let than = res => {
      this.setData({
        questTagLists: res.length > 0 ? [res[0]] : []
      })
    }
    let fail = res => {
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
    let link = api.getPhstoreById + '/' + id;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      setTimeout(function () {
        wx.hideToast();
      }, 500)
      if (res.agentId){
        this.setData({
          phStores: res,
          phShow: true,
          haveStore: true,
          showGoYBL: res.o2oService == 1 ? true : false,
        })
      }
      
    }
    let fail = res => {
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 咨询药师
  goPharCoun: function (e) {
    let phStore = e.currentTarget.dataset
    wx.reLaunch({
      url: "/page/drugInformation/pages/pharCounseling/pharCounseling?id=" + phStore.id + '&name=' + phStore.name + '&o2oSerivce=' + phStore.o2oserivce,
    })
  },

  //导航到店
  navMapTap: function (e) {
    let locName = e.currentTarget.dataset.name;
    let lat = parseFloat(e.currentTarget.dataset.lat);
    let lng = parseFloat(e.currentTarget.dataset.lng);
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: locName,
      scale: 16
    })
  },

  //  埋点
  getDataStatistical: function () {
    // 获取上一个页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPageOne = pages[pages.length - 2];  //上1个页面
    this.setData({
      currPage: currPage.route,
      prevPageOne: prevPageOne ? prevPageOne.route : ''
    })
    this.globalCome()
  },

  //获取地理位置
  warrant: function (e) {
    wx.getSetting({
      success: (res) => {
        // console.log('getSetting', res)
        wx.getLocation({
          type: 'gcj02',
          altitude: true,
          success: (res) => {
            // console.log('getSetting..s', res)
            let latitude = res.latitude;
            let longitude = res.longitude;
            let locat = latitude + "," + longitude
            this.setData({
              location: locat,
              lat: latitude,
              lng: longitude
            })
          },
          fail: (res) => {
            // console.log('getSetting..f', res)
          },
          complete: (res) => {
            this.setLogPV()
          }
        })
      }
    })
  },
  // 登录
  globalCome: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
      this.APPlogin()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // console.log('...callbac.kkkk')
      app.userInfoReadyCallback = res => {
      // console.log('...callback', res.userInfo)
        this.setData({
          // userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      this.APPlogin()
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('it...success', res.userInfo)
          app.globalData.userInfo = res.userInfo
          app.globalData.userInfo.wxOpenid = res.userInfo.openId
          app.globalData.userInfo.userid = res.userInfo.userId
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.APPlogin();
        }
      })
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 3000)
  },
  APPlogin: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let _this = this
        let code = res.code
        let link = userApi.AuthLoginByWeixin;
        let header = {
          'content-type': 'application/x-www-form-urlencoded'
        }
        let obj = {
          code: code
        };
        let than = res => {
          if (res.code == 200) {
            // console.log('APPlogin', res.data)
            app.globalData.userInfo = res.data;
            app.globalData.userInfo.wxOpenid = res.data.openId
            app.globalData.userInfo.userid = res.data.userId
            wx.setStorageSync('logInfo', res.data);
            _this.getUserContent();
          }
        }
        let fail = res => {
        }
        let complete = res => {}
        app.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);
      }
    })
  },
  // 根据userid获取用户信息
  getUserContent: function () {
    let link = userApi.AuthGetUserInfo + '/' + wx.getStorageSync('logInfo').userId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      if (res.code == 200) {
        console.log('getUserContent', res);
        if (res.code == '200') {
          let json = res.data;
          this.setData({
            userInfo: json,
          })
          wx.setStorageSync('userInfo', json);
        } else {
        }
      }
    }
    let fail = res => {
    }
    let complete = res =>{
      this.warrant()
    }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 发送埋点信息
  setLogPV: function (actType, videoindex) {
    console.log('setLogPV..userInfo', this.data.userInfo)
    // console.log('actType', actType, this.data.actType)
    // console.log('videoindex', videoindex)
    // 行为来源
    let actOrigin = ''
    let actTarget = ''
    let actTypeData = actType ? actType : this.data.actType
    if (actTypeData > 2 && (actTypeData != 22 && actTypeData != 3)) {
      actOrigin = this.data.currPage
    } else if (actTypeData == 3) {
      actOrigin = this.data.currPage
      actTarget = '退出'
    } else if (actTypeData == 22) {
      actOrigin = this.data.currPage
      actTarget = this.data.prevPageOne
      actTypeData = 2
    } else {
      actOrigin = this.data.actOrigin ? this.data.actOrigin : this.data.prevPageOne
    }
    let actParams = {}
    actParams.temModel = this.data.temModel
    actParams.code = this.data.drugCode
    if (videoindex){
      actParams.duration = VideoMap[videoindex].duration
      actParams.videoID = VideoMap[videoindex].videoID
    }

    let params = {
      actDesc: '', // 行为描述
      actLat: this.data.lat, // 
      actLong: this.data.lng,
      actOrigin: actOrigin, // 行为来源
      actTarget: actTarget ? actTarget : this.data.currPage, // 行为目标
      actType: actTypeData, //行为分类[0:授权行为; 1:进入小程序; 2:页面间跳转; 3:退出小程序; 10:开始播放; 11:暂停; 12:停止播放;] ,
      openId: this.data.userInfo.wxOpenid,
      subId: this.data.userInfo.userid,
      actParams: actParams,
      shopId: this.data.shopId
    }
    console.log('logPV.params', params)

    let link = api.logPV;
    let header = { }
    let obj = params
    let than = res => {
    }
    let fail = res => {
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);
  },

  // 点击图片放大
  previewImg: function () {
    let imgArr = [this.data.drugDetail.pic1]
    wx.previewImage({
      current: imgArr[0],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 跳转问卷调查小程序
  goSurveyMini: function(e){
    let _this = this
    // let id = e.currentTarget.dataset.id
    let path = 'pages/wjxqList/wjxqList?activityId=' + e.currentTarget.dataset.id
    console.log('path', path)
    if (this.data.loaddingGoMini){
      return
    } else {
      this.setData({
        loaddingGoMini: true
      })
      wx.showLoading({
        title: '加载中，请稍后',
      })
      wx.navigateToMiniProgram({
        appId: 'wxd947200f82267e58',
        path: path,
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
          wx.hideLoading();
          _this.setData({
            loaddingGoMini: false
          })
        },
        fail(res){
          wx.hideLoading();
          _this.setData({
            loaddingGoMini: false
          })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpt(options)
    let _this = this
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          temModel: res.brand + ',' + res.model
        })
      }
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
  onHide: function (e) {
    this.setLogPV('3')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
    this.setLogPV('22')
    VideoMap = {}
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
    let shareData = {
      title: "您的好友给您推荐了一个用药视频",
      path: "/page/drugInformation/pages/information/information?code=" + this.data.drugCode + "&actOrigin=custom" + "&actType=1",
    }
    return shareData
  },

})