// titles.js

const app = getApp();
const guideApi = require('../../page/drugInformation/resources/config/api.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showGoYBL: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageIcon: guideApi.imageIcon,

    showUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    showSacnDrug: false,
    iphoneModel: false,
    longerFocus: false,

    goYBLLoading: false,
    
    height: app.globalData.height * 2 + 40,
  },
  attached: function (e){
    let _this = this
    wx.getSystemInfo({
      success(res) {
        let temModel = res.brand
        if (temModel.indexOf("iPhone") != -1){
          _this.setData({
            iphoneModel: true
          })
        }
      }
    })
    
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log('getUserInfo', res.userInfo)
            }
          })
          _this.setData({
            showUserInfo: false
          })
        } else {
          _this.setData({
            showUserInfo: true
          })
        }
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    longerFocus: function(){
      this.setData({
        longerFocus: !this.data.longerFocus
      })
    },
    closeShowSacn: function () {
      this.setData({
        showSacnDrug: false
      })
    },
    showSacnDrug: function(){
      let showSacnDrug = wx.getStorageSync('showSacnDrug');
      if (showSacnDrug){
        this.sacnDrug()
      } else{
         this.setData({
          showSacnDrug: true
        })
      }
    },
    sacnDrug: function () {
      this.setData({
        showSacnDrug: false
      })
      if (this.data.longerFocus){
        wx.setStorageSync('showSacnDrug', 'true');
      }
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          if (/^[0-9]+$/.test(res.result)) {
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
                if (arr != null) {
                  if (arr[0] == 'code') {
                    path = arrObj[1];
                    wx.navigateTo({
                      url: "/page/drugInformation/pages/information/information?" + path + "&actOrigin=QRCode",
                    })
                  } else if (arr[0] == 'id') {
                    path = arrObj[1];
                    wx.navigateTo({
                      url: "/page/drugInformation/pages/videoList/videoList?" + path,
                    })
                  } else if (arr[0] == 'watchGuide') {
                    wx.navigateTo({
                      url: "/page/drugInformation/pages/watchGuide/watchGuide",
                    })
                  } else if (arr[0] == 'searchIndex') {
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

    call: function(){
      app.callFun()
    },

    goDrugInstruction(){
      // 获取上一个页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      if (currPage.route.indexOf("pharCounseling") != -1){
        return
      } else {
        wx.reLaunch({
          // url: "/page/drugInformation/pages/drugInstruction/drugInstruction",
          url: "/page/drugInformation/pages/pharCounseling/pharCounseling",
        })
      }
    },
    my() {
      // 获取上一个页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      if (currPage.route.indexOf("my") != -1) {
        return
      } else {
        wx.reLaunch({
          url: "/page/user/pages/my/my",
        })
      }
    },


    // 用户授权
    bindGetUserInfo(e) {
      let success = res =>{
        this.setData({
          showUserInfo: false
        })
        app.userUpdate(res)
      }
      let fail = res => {
      }
      app.getSetting(success, fail)
    },

    closeUserInfo(){
      this.setData({
        showUserInfo: false
      })
    },


    //去药便利健康服务小程序
    goYBLMini(){
      if (this.data.goYBLLoading){
        return
      }
      wx.showLoading({
        title: '加载中，请稍后',
      })
      this.setData({
        goYBLLoading: true
      })
      let _this = this
      wx.navigateToMiniProgram({
        appId: 'wx943e291355654a08',
        path: 'page/o2o/pages/index/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
          wx.hideLoading();
          _this.setData({
            goYBLLoading: false
          })
        },
        fail(res) {
          wx.hideLoading();
          _this.setData({
            goYBLLoading: false
          })
        }
      })
    }
    
  }
})
