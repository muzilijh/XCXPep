const ApiRootUrl = require('config').btcUrl;
let wxUser = {
  AuthLoginByWeixin: ApiRootUrl + 'user/wechat/openidAndSessionKey', //微信登录
  AuthGetUserInfo: ApiRootUrl + 'user/wx/subscriber/getUserInfo',//通过userId查询用户信息
  AuthEditUserInfo: ApiRootUrl + 'user/wechat/auth',//通过userId更新用户信息
}

module.exports = wxUser;