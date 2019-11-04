const app = getApp()
Component({
  properties: {
    barData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    barData: {
      //顶部
      navbarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        // showQuery: 0, // 是否显示右上角搜索    1表示显示    0表示不显示
        bg: 0,
      },
      //右下侧
      toolbarData: {
        showTool: 1,//1表示显示    0表示不显示
        isTabBar:0,
        //hideCount:true,
      },
    }

  },
  attached: function (e) {
    this.setData({
      // 获取是否是通过分享进入的小程序
      share: app.globalData.share,
      // 定义导航栏的高度   方便对齐
      height: app.globalData.height,
    })
    setTimeout(()=>{
      this.setData({
        'barData.toolbarData.hideCount': app.globalData.hideCount,
      })
    },1000)
    let pages = getCurrentPages();
    console.log('attached', pages)
    if(pages.length<=1){
      this.setData({
        share: true
      })
    } else {
      this.setData({
        share: false
      })
    }
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      // wx.switchTab({
      wx.reLaunch({
        url: '/page/drugInformation/pages/searchIndex/searchIndex',
      })
      app.globalData.share = false
    },
    // 返回顶部
    pageScrollTop: function () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
    },
  }

}) 