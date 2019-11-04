// page/drugInformation/pages/scanTransit/scanTransit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  // 调整options
  getOpt: function (options) {
    console.log('getOpt', options)
    // options.q = 'https%3A%2F%2Ftest.scan.yaobili.com%2Finformation%3Fcode%3D6900372109377%26shopId%3DMD20181126153326000003'
    // options.q = 'https%3A%2F%2Ftest.scan.yaobili.com%2FwatchGuide%3FwatchGuide'
    // options.q = 'https%3A%2F%2Ftest.scan.yaobili.com%2FsearchIndex%3FsearchIndex'
    // options.q = 'https%3A%2F%2Ftest.scan.yaobili.com%2FvideoList%3Fid%3D127'


    let url = JSON.stringify(decodeURIComponent(options.q)).replace(/^\"|\"$/g, '');
    let arrObj = url.split("?");
    console.log('arrObj', arrObj)
    let path = '';
    if (arrObj.length > 1) {
      let arrPara = arrObj[1].split("&");
      let arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        console.log('arr', arr)
        if (arr[0] == 'id') {
          console.log('id', arrObj)
          path = arrObj[1];
          console.log('...id', path)
          wx.redirectTo({
            url: "/page/drugInformation/pages/videoList/videoList?" + path,
          })
        } else if (arr[0] == 'code') {
          console.log('information', arrObj)
          path = arrObj[1];
          wx.redirectTo({
            url: "/page/drugInformation/pages/information/information?" + path + "&actOrigin=QRCode",
          })
        } else if (arr[0] == 'watchGuide') {
          console.log('watchGuide', arrObj)
          wx.redirectTo({
            url: "/page/drugInformation/pages/watchGuide/watchGuide",
          })
        } else if (arr[0] == 'searchIndex') {
          console.log('searchIndex', arrObj)
          wx.reLaunch({
            url: "/page/drugInformation/pages/searchIndex/searchIndex",
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
          wx.reLaunch({
            url: "/page/drugInformation/pages/searchIndex/searchIndex",
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