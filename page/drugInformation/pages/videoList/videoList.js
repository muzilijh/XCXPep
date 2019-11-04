const api = require('../../resources/config/api.js');
const drugConstLists = require('../../resources/config/drugLists.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIcon: api.imageIcon,

    showVideo: false,
    showTopVideo: false,
    nowVideo: {},
    videoindex: '',
    currentIndex: 0,

    cname: '视频列表',

    allClassify: [],
    proNum: 0,
    contentLists: [],
    videoUrlLists: [],
    videLoading: true,

    moreNav: true,

    healthListsData: [], // 健康频道

    videoTop: 500,

    // 推荐用药
    associatedDrugLists: [],

    
    // 顶部,右下侧组件所需的参数
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '视频列表', //导航栏 中间的标题
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

  //滚动监控
  onPageScroll: function (e) {
    if (e.scrollTop >= this.data.videoTop - 20) {
      // console.log(123, this.data.videoTop)
      this.setData({
        showTopVideo: false
      })
    } else {
    }
  },
  //  父子组件--点击上面视频停止下面视频播放
  onMyEvent: function (e) {
    console.log('onMyEvent', e)
    this.setData({
      showVideo: false
    })
  },


  //切换商品导航
  navTab(e) {
    console.log(',,', e.currentTarget.dataset)
    console.log('videoindex', this.data.videoindex)
    console.log(',,', e.currentTarget.dataset.num)
    console.log('navid', e.currentTarget.dataset.navid)

    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })

    if (this.data.videoindex) {
      let videoCtxPrev = wx.createVideoContext('myVideo' + this.data.videoindex); //找到当前正在播放的视频
      videoCtxPrev.pause();    //暂停
    }
    this.setData({
      videoUrlLists: []
    })
    this.setData({
      proNum: e.currentTarget.dataset.num,
      contentLists: this.data.allClassify[e.currentTarget.dataset.num],
      videoUrlLists: this.data.allClassify[e.currentTarget.dataset.num].gVideoList,
      videoindex: '',
      nowVideo: {},
      showVideo: false,
      showTopVideo: false,
      currentIndex: 0
    })

    this.getHealth(e.currentTarget.dataset.navid)
    let cname = e.currentTarget.dataset.cname
    this.changeConstDrug(cname)
  },
  // 更改固定药品推荐
  changeConstDrug: function(cname){
    console.log('...cname', cname)
    this.setData({
      associatedDrugLists: []
    })
    if (cname == "慢性胃炎"){
      this.setData({
        associatedDrugLists: drugConstLists.mxwy
      })
    } else if (cname == "胃溃疡") {
      this.setData({
        associatedDrugLists: drugConstLists.wky
      })
    } else if (cname == "腹泻") {
      this.setData({
        associatedDrugLists: drugConstLists.fx
      })
    } else if (cname == "儿童感冒") {
      this.setData({
        associatedDrugLists: drugConstLists.etgm
      })
    } else if (cname == "儿童发烧") {
      this.setData({
        associatedDrugLists: drugConstLists.etfs
      })
    } else if (cname == "儿童咳嗽") {
      this.setData({
        associatedDrugLists: drugConstLists.etks
      })
    } else if (cname == "湿疹") {
      this.setData({
        associatedDrugLists: drugConstLists.sz
      })
    } else if (cname == "皮炎") {
      this.setData({
        associatedDrugLists: drugConstLists.py
      })
    } else if (cname == "风热感冒") {
      this.setData({
        associatedDrugLists: drugConstLists.frgm
      })
    } else if (cname == "风寒感冒") {
      this.setData({
        associatedDrugLists: drugConstLists.fhgm
      })
    } else{
      this.setData({
        associatedDrugLists: drugConstLists.other
      })
    }
  },

  moreBtn: function (e) {
    this.setData({
      moreNav: !this.data.moreNav
    })
    let _this = this
    var query = wx.createSelectorQuery();
    query.select('#topUnfoldHeight').boundingClientRect()
    if (!this.data.moreNav){
      console.log('头部展开')
      query.exec(function (res) {
        _this.setData({
          topUnfoldHeight: res[0].height + 10 + 'px'
        })
      })
    } else {
      query.exec(function (res) {
        _this.setData({
          topUnfoldHeight: 130 + 'rpx'
        })
      })
    }

  },

  getCategorysById: function () {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 5000
    })
    wx.request({
      url: api.getCategorysById + '/' + this.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('getCategorysById', res);
        setTimeout(function () {
          wx.hideToast()
        }, 1000)
        if (res.statusCode == 200) {
          this.setData({
            allClassify: res.data.data,
            contentLists: res.data.data.length > 0 ? res.data.data[0] : [],
            videoUrlLists: res.data.data.length > 0 ? res.data.data[0].gVideoList : [],
            videLoading: false
          })
          console.log('.contentLists.', res.data.data[0])
        }
        if (this.data.allClassify.length > 0) {
          this.getHealth(this.data.allClassify[0].gc.id)
          this.changeConstDrug(this.data.allClassify[0].gc.cname)
        }
        this.getVideoTopHeight()

        setTimeout(function () {
          wx.stopPullDownRefresh()
        }, 500);

      }
    })
  },
  // 获取视频距离顶部距离
  getVideoTopHeight: function(){
    let _this = this
    var query = wx.createSelectorQuery();
    query.select('#getheight').boundingClientRect()
    query.exec(function (res) {
      console.log('getheight', res);
      _this.setData({
        videoTop: res[0] ? res[0].top : '500'
      })
    })
  },

  // 获取健康频道
  getHealth: function (id) {
    console.log('gethealthid', id)
    wx.request({
      url: api.getHealth + '/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('gethealth', res);
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            this.setData({
              healthListsData: res.data.data.gList
            })
          } else {
            this.setData({
              healthListsData: []
            })
          }
        } else {
          this.setData({
            healthListsData: []
          })
        }
      }
    })
  },

  // 获取视频封面图
  getVideoTop: function () {
    wx.request({
      url: api.videoTop,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('getVideoTop', res);
        if (res.statusCode == 200) {
          this.setData({
            videoTopLists: res.data.data
          })
        }
      }
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

  // 视频搜索列表页
  goSearchIndex: function () {
    wx.navigateTo({
      url: "/page/drugInformation/pages/searchIndex/searchIndex",
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('viLi', options)
    this.setData({
      //  = 807 = 399 = '儿童感冒及解热镇痛' = 809
      cname: options.cname,
      id: options.id,
    })
    this.getCategorysById()
    // wx.setNavigationBarTitle({
    //   title: decodeURIComponent(this.data.cname)
    // })

    this.setData({
      'barData.navbarData.title': decodeURIComponent(this.data.cname)
    })

    this.getVideoTop()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoPlay = this.selectComponent("#videoPlay")
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
    this.getCategorysById()
    this.setData({
      proNum: 0,
      videoindex: '',
      nowVideo: {},
      showVideo: false,
      showTopVideo: false,
      currentIndex: 0
    })
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
      descGoods = "@" + wx.getStorageSync('userInfo').nickname + " 给您推荐了" + this.data.cname
    }
    let shareData = {
      title: "一起看视频" + descGoods,
      path: "/page/drugInformation/pages/videoList/videoList?id=" + this.data.id + '&cname=' + this.data.cname
    }
    return shareData
  }
})