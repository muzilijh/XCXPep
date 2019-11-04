/**
 * thod请求，
 * URL：接口
 * header：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(thod, url, headers, postData, doSuccess, doFail, doComplete) {
  let headerList = headers;
  headerList.wx='true';
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: url,
    header: headerList,
    data: postData,
    method: thod,
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
    complete: function () {
      // 无论请求成功与否
      doComplete();
    }
  })
}

module.exports.request = request;