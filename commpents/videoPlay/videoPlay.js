// titles.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoUrlLists: {
      type: Array,
      value: [],
    },
    nowVideo:{
      type: Object,
      value: {},
    },
    videoindex: {
      type: String,
      value: '',
    },
    showVideo: {
      type: Boolean,
      value: false,
    },
    currentIndex:{
      type: String,
      value: '',
    },
    videoTopLists:{
      type: Array,
      value: [],
    },
    videoHigth: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperFalse: false,
    swiperTrue: true,

    array: [1, 2, 3, 4, 5, 1, 2, 3, 4]


  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击播放
    bindplayVideo: function (e) {
      console.log('..bindplay..', e)
      let id = e.currentTarget.dataset.pid
      console.log('id', id)
      let videoindex = e.currentTarget.dataset.index;
      var videoCtx = wx.createVideoContext(id);    //获取点击的视频

      console.log('videoCtx', videoCtx)
      console.log('this.data.videoindex', this.data.videoindex)
      console.log('videoindex', videoindex)
      if (!this.data.videoindex) {    //没有其他视频播放时
        console.log('1')
        this.setData({
          videoindex: videoindex
        }, function () {
          console.log(',,,,')
          videoCtx.play();
        })
      } else {    // 有其他视频正在播放
        console.log('2', this.data.videoindex)
        let videoCtxPrev = wx.createVideoContext('myVideo' + this.data.videoindex); //找到当前正在播放的视频
        console.log('videoCtxPrev...', videoCtxPrev)
        videoCtxPrev.pause();    //暂停
        this.setData({
          videoindex: videoindex
        }, function () {
          videoCtx.play();    //播放点击的视频
        })
      }
    },

    suspendedVideo: function (e) {
      console.log("..暂停视频")
      let videoindex = e.currentTarget.dataset.index;
      if (this.data.videoindex == videoindex) {
        this.setData({
          videoindex: ''
        })
      }
    },

    // 关闭隐藏视频
    closeVideo: function () {
      console.log('videoindex----', this.data.videoindex)
      this.setData({
        nowVideo: {},
        showVideo: false
      })
    },

    // 视频
    changeVideo: function (e) {
      console.log('e', e.target.dataset)
      let videoitem = e.target.dataset.videoitem
      this.setData({
        nowVideo: {},
        showVideo: false
      })
      let _this = this
      this.setData({
        nowVideo: _this.data.videoUrlLists[e.target.dataset.index],
        showVideo: true,
        currentIndex: e.target.dataset.index,
        title: videoitem.title ? videoitem.title:'',
        description: videoitem.description ? videoitem.description : '',
      })

      // 父子传值
      this.triggerEvent('myevent', { paramBtoA: "666传值成功" });
    }
  }
})
