const Url = require('../../../../config/config').btcUrl;
const IMGUrl = require('../../../../config/config').machineUrl;
const imagesUrl = require('../../../../config/config').imagesUrl;

const GoodsUrl = Url+'goods/';//获取药品
const GuideUrl = Url+'guide/';//

// const GuideUrl = 'http://192.168.1.127:10098/';


module.exports = {

  imgLink: IMGUrl + 'images/',//存放商品图片地址
  imageIcon: imagesUrl + 'guide/',//图片地址

  GetDrugMessage: GoodsUrl + 'products/findProductVoById', // 根据药品id获取药品说明书
  GetDrug: GoodsUrl + 'products/findProductInProd', // 根据69码获取药品说明书
  GetProductVoPlus: GoodsUrl + 'products/pageProductVoPlus', // 搜索查询药品信息

  getCategoryListById: GoodsUrl + 'categorys/getNextLevelCategoryListById',
  // getProductByCId: GoodsUrl + 'products/findProductVoPlusByCategoryId',
  getProductByCId: GoodsUrl + 'products',


  getDrugDetail: GuideUrl + 'guide/resource',  // 获取药品-药品相关视频
  getDrugAllVideo: GuideUrl + 'guide/res',  // 获取药品-所有相关视频
  getCategorys: GuideUrl + 'gc/top/categorys',  // 获取首页用药视频分类
  getCategorysById: GuideUrl + 'gc/two/level/categorys',  // 根据一级分类查询二级及数据

  logPV: GuideUrl + 'log/pv',  // 扫码看视频页面记录用户信息、视频观看数据

  videoTop: GuideUrl + 'g/picture/video/wx/list',  // 获取视频封面图
  getHealth: GuideUrl + 'gc/wx/health/channel',  // 根据二级分类获取健康频道数据

  videoTag: GuideUrl + 'video/tags',  // 获取视频分类Tag
  videoListByTag: GuideUrl + 'video',  // 获取视频分类Tag
  
  getPhLastagent: GuideUrl + 'ph/user/lastagent', // 获取最近服务门店
  getPhAgentById: GuideUrl + 'ph/agent', // 根据门店id获取药师
  giveLike: GuideUrl + 'ph', // 给药师点赞
  getPhRecord: GuideUrl + 'ph/user/record', // 获取扫码记录
  getPhstoreById: GuideUrl + 'ph/store', // 查询指定门店
  getPhDoctorById: GuideUrl + 'ph/doctor', // 单独获取药师信息

  getQuestTag: GuideUrl + 'quest/tag', // 根据69码获取问卷星问卷id

};