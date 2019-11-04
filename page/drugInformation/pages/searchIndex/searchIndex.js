const api = require('../../resources/config/api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIcon: api.imageIcon,

    videoLists:[],
    videoTagLists: [],
    showVideo: false,

    parentName: '',

    moreNav: false,
    proNum: 0,

    showGoYBL: false
  },


  // 跳转到科学观看用药视频指南页面
  goWatchGuide: function (e) {
    wx.navigateTo({
      url: "/page/drugInformation/pages/watchGuide/watchGuide"
    })
  },


  // 视频搜索列表页
  goSearchIndex: function () {
    wx.navigateTo({
      url: "/page/drugInformation/pages/searchIndex/searchIndex",
    })
  },

  moreBtn: function (e) {
    this.setData({
      moreNav: !this.data.moreNav
    })
  },
  // //切换商品导航
  // navTab(e) {
  //   console.log(',,', e.currentTarget.dataset)
  //   this.setData({
  //     proNum: e.currentTarget.dataset.num,
  //   })
  //   // this.getVideoList(e.currentTarget.dataset.navid)
  // },

  // // 点击播放视频
  // palyVideo: function(e){
  //   // console.log('e', e)
  //   let item = e.currentTarget.dataset.mesitem
  //   console.log('item', item)
  //   //执行全屏方法  
  //   var videoContext = wx.createVideoContext('myVideo', this);
  //   console.log(',,,', videoContext)
  //   videoContext.requestFullScreen();
   
  //   this.setData({
  //     currentVideo: item,
  //     fullScreen: true
  //   })
  // },
  // /**关闭视屏 */
  // closeVideo() {
  //   //执行退出全屏方法
  //   var videoContext = wx.createVideoContext('myvideo', this);
  //   videoContext.exitFullScreen();
  // },
  // /**视屏进入、退出全屏 */
  // fullScreen(e) {
  //   var isFull = e.detail.fullScreen;
  //   //视屏全屏时显示加载video，非全屏时，不显示加载video
  //   this.setData({
  //     fullScreen: isFull
  //   })
  // },

  // 去药品查询页面
  goDrugQuery: function(){
    wx.navigateTo({
      url: "../drugQuery/drugQuery",
    })
  },
  // banner跳转到视频教程页面
  goWatchGuide: function () {
    wx.navigateTo({
      url: "../watchGuide/watchGuide",
    })
  },
  //扫码
  codeScan: function () {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (/^[0-9]+$/.test(res.result)) {
          console.log('code69', res.result)
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
                }else if (arr[0] == 'id') {
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


  // // 获取视频分类Tag
  // getVideoTag: function(){
  //   wx.showToast({
  //     title: "加载中...",
  //     icon: "loading",
  //     duration: 5000
  //   })
  //   wx.request({
  //     url: api.videoTag,
  //     method: 'GET',
  //     success: res => {
  //       console.log('videoTag', res)
  //       if (res.statusCode == 200) {
  //         setTimeout(function () {
  //           wx.hideToast();
  //         }, 500)
  //         if (res.data.code == 200) {
  //           this.setData({
  //             videoTagLists: res.data.data
  //           })
  //           if (res.data.data.length>0){
  //           }
  //         }
  //       }
  //     },
  //     complete: res=>{
  //       wx.stopPullDownRefresh() //完成停止加载
  //     }
  //   })
  // },
  // // 根据TagId获取视频列表
  // getVideoList: function (tagId){
  //   wx.showToast({
  //     title: "加载中...",
  //     icon: "loading",
  //     duration: 5000
  //   })
  //   wx.request({
  //     url: api.videoListByTag + '/' + tagId,
  //     method: 'GET',
  //     success: res => {
  //       console.log('videoTag', res)
  //       if (res.statusCode == 200) {
  //         setTimeout(function () {
  //           wx.hideToast();
  //         }, 500)
  //         if (res.data.code == 200) {
  //           this.setData({
  //             videoLists: res.data.data
  //           })
  //         } else {
  //           this.setData({
  //             videoLists: []
  //           })
  //         }
  //       }
  //     }
  //   })
  // },

  // // 获取视频封面图
  // getVideoTopUrl: function () {
  //   wx.request({
  //     url: api.videoTop,
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: res => {
  //       console.log('getVideoTop', res);
  //       if (res.statusCode == 200) {
  //         this.setData({
  //           videoTopUrlLists: res.data.data
  //         })
  //       }
  //     }
  //   })
  // },


  //用药视频合集
  getCategorys: function () {
    let link = api.getCategorys + '?type=1';
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
    let complete = res => {
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
      wx.stopPullDownRefresh() //完成停止加载
    }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
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

  // 根据一级分类id查询二级分类---一级分类id写死固定
  getCategoryListById: function(){
    let link = api.getCategoryListById + '?categoryId=0a6ca86880784e6e8bd78269cf3aac08';
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      if (res.code == 200) {
        console.log('res', res)
        this.setData({
          videoTagListsLists: res.data
        })
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    app.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);
  },

  // 根据分类id查询药品
  goGetDrugByCId(e) {
    console.log(',,', e.currentTarget.dataset)
    let categoryId = e.currentTarget.dataset.navid
    let catName = e.currentTarget.dataset.catname

    wx.navigateTo({
      url: "../drugLists/drugLists?categoryId=" + categoryId + '&catName=' + catName,
    })

  },

  // 获取最近服务门店
  getPhLastagent: function(){
    let link = api.getPhLastagent + '/' + wx.getStorageSync('logInfo').openId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = {};
    let than = res => {
      console.log('res', res)
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
      this.setData({
        parentName: res.name ? res.name : '',
        showGoYBL: res.o2oSerivce == 1 ? true : false,
      })

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
    // this.getVideoTag()
    // this.getVideoTopUrl()

    this.warrant();
    this.getCategorys()
    this.getCategoryListById()


    wx.showLoading({
      title: '加载中',
    })

    //登陆
    let succss = res => {
      this.getPhLastagent()
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
    console.log(',,,') 
    // this.getVideoTag()
   // this.setData({
    //   proNum: 0,
    // })
    wx.showLoading({
      title: '加载中',
    })
    this.getCategorys()
 
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


  //获取地理位置
  warrant: function (e) {
    wx.getSetting({
      success: (res) => {
        console.log('res-getSetting', res)
        let getSettingRes = res
        console.log('getSettingRes.authSetting', getSettingRes.authSetting["scope.userLocation"])
        wx.getLocation({
          type: 'wgs84',
          altitude: true,
          success: (res) => {
            console.log('res..', res)
            let latitude = res.latitude;
            let longitude = res.longitude;
            let locat = latitude + "," + longitude
            this.setData({
              empShow: false,
              agentDetail: {
                lat: latitude,
                lng: longitude
              },
              location: locat,
            })
          },
          fail: (res) => {
            console.log('...fail', res)
            this.setData({
              empShow: true
            })
            console.log('....sd', getSettingRes.authSetting["scope.userLocation"])
            if (this.data.empShow && getSettingRes.authSetting["scope.userLocation"] == undefined) {
              this.warrant();
            }
          }
        })
      }
    })
  },
  //重新授权
  lbsWarrant: function () {
    wx.openSetting({
      success: (data) => {
        console.log('lbsWarrant', data);
        if (data.authSetting["scope.userLocation"] == true) {
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            empShow: false
          })
          //再次授权，调用getLocationt的API
          this.warrant();
        } else {
          this.setData({
            empShow: true
          })
        }
      }
    })
  }

  
  
})