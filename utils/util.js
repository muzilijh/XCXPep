const orderapi = require('../page/order/resources/config/api.js');//order api地址
const app = getApp();
//时间
const formatTime = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes() + 15
  let second = date.getSeconds()
  if (minute > 60) {
    minute = minute - 60
    hour = hour + 1
  }

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//经纬度
const formatLocation = (longitude, latitude) => {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude
  latitude = latitude

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation
}
