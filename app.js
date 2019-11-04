const ajax = require("./config/ajax.js");
const api = require("./config/apiConfig.js");
App({
  APPlogin: function (succss) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res)
        let code = res.code
        let link = api.AuthLoginByWeixin;
        let header = {
          'content-type': 'application/x-www-form-urlencoded'
        }
        let obj = {
          code: code
        }
        let than = res => {
          console.log(res)
          this.globalData.userInfo = res.data.userId;
          this.globalData.logInfo = res.data;
          wx.setStorageSync('logInfo', res.data);
          //console.log(succss)
          succss(res);
        }
        let fail = res => {
          console.log(res)
        }
        let complete = res => { }
        this.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);
      }
    })
  },
  getUserContent: function (succss) {
    //console.log(wx.getStorageSync('logInfo').userId)
    let link = api.AuthGetUserInfo + '/' + wx.getStorageSync('logInfo').userId;
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    let obj = { }
    let than = res => {
      if (res.code == '200') {
        let json = res.data;
        wx.setStorageSync('cardNum', json.uaccount);
        wx.setStorageSync('userInfo', json);
        this.globalData.userDataInfo = true;
        succss(json);//请求成功返回
      }
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    this.globalData.ajaxLink.request('GET', link, header, obj, than, fail, complete);

  },
  //用户资料更新
  userUpdate:function(rawData){
    console.log('rawData', rawData)
    let userInfo = wx.getStorageSync('logInfo');
    console.log('userInfo...', userInfo)
    userInfo.nickname = rawData.nickName
    userInfo.uavatarurl = rawData.avatarUrl
    userInfo.gender = rawData.gender
    userInfo.ucity = rawData.city
    userInfo.uprovince = rawData.province
    userInfo.ucountry = rawData.country
    userInfo.language = rawData.language
    userInfo.uauthorized = true
    wx.setStorageSync('userInfo', userInfo);

    userInfo.userid = wx.getStorageSync('logInfo').userId

    let link = api.AuthEditUserInfo + '/' + wx.getStorageSync('logInfo').uuid;
    let header = { }
    let obj = userInfo
    let than = res => {
      // if (res.code == '200') {
      //   let json = res.data;
      //   console.log('json', res)
      //   // wx.setStorageSync('userInfo', json);
      //   this.globalData.userDataInfo = true;
      // } 
      this.globalData.userDataInfo = true;
    }
    let fail = res => {
      console.log(res)
    }
    let complete = res => { }
    this.globalData.ajaxLink.request('POST', link, header, obj, than, fail, complete);

  },
  //获取用户信息
  getSetting: function(success, fail){
    wx.getSetting({
      success(res) {
        console.log('get.', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('getUserInfo', res.userInfo)
              success(res.userInfo)
            }
          })
        } else {
          fail()
        }
      }
    })
  },
  //拨打客服
  callFun: function () {
    wx.makePhoneCall({
      phoneNumber: this.globalData.tell //拨打客服电话
    })
  },
  //呼叫
  callEmx: function (e) {
    //console.log(e)
    wx.makePhoneCall({
      phoneNumber: e//拨打客服电话
    })
  },

  //
  onLaunch: function (options) {
    console.log('dsdf')
    //校验sesstionKey
    let succss = res => { }
    wx.checkSession({
      success: () => {
        //session_key 未过期，并且在本生命周期一直有效
        console.warn('key未过期')
        let storage = this.globalData.userInfo
        if (storage == undefined) {
          this.APPlogin(succss)
        }
      },
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        console.warn('key已经失效')
        this.APPlogin(succss)
      }
    })

    console.log('optionsoptionsoptions',options)
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008 || options.scene == 1011) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              //  this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
    this.screenSize();
  },
  
  //
  screenSize: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    })
  },

  bezier: function (points, times) {
    // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
    // 1、计算相邻控制点间距。
    // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
    // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
    // 4、根据DE的正余弦值和DE的值计算出F的坐标。
    // 邻控制AB点间距
    var bezier_points = [];
    var points_D = [];
    var points_E = [];
    const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
    // 邻控制BC点间距
    const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
    // D每次在AB方向上移动的距离
    const EACH_MOVE_AD = DIST_AB / times;
    // E每次在BC方向上移动的距离 
    const EACH_MOVE_BE = DIST_BC / times;
    // 点AB的正切
    const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
    // 点BC的正切
    const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
    // 点AB的弧度值
    const RADIUS_AB = Math.atan(TAN_AB);
    // 点BC的弧度值
    const RADIUS_BC = Math.atan(TAN_BC);
    // 每次执行
    for (var i = 1; i <= times; i++) {
      // AD的距离
      var dist_AD = EACH_MOVE_AD * i;
      // BE的距离
      var dist_BE = EACH_MOVE_BE * i;
      // D点的坐标
      var point_D = {};
      point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
      point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
      points_D.push(point_D);
      // E点的坐标
      var point_E = {};
      point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
      point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
      points_E.push(point_E);
      // 此时线段DE的正切值
      var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
      // tan_DE的弧度值
      var radius_DE = Math.atan(tan_DE);
      // 地市DE的间距
      var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
      // 此时DF的距离
      var dist_DF = (dist_AD / DIST_AB) * dist_DE;
      // 此时DF点的坐标
      var point_F = {};
      point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
      point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
      bezier_points.push(point_F);
    }
    return {
      'bezier_points': bezier_points
    };
  },

  globalData: {
    logInfo: wx.getStorageSync('logInfo'),
    userInfo: '',
    userDataInfo: false,
    tell: '0755-26414852',
    JoinHotline: '0755 - 85283088',
    flag: false,
    orderType: 0,
    ajaxLink: ajax,
    orderContent: '',
    share: false,  // 分享默认为false
    height: 0,
    hideCount: false,
  }
})