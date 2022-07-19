import { getArticleList, weatherApi } from '../../api/api'
import api from '../../api/require'
import {GAODE_MAP, TECENT_SECRET_KEY} from '../../utils/const'

const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
  key: TECENT_SECRET_KEY
});

Page({
  data: {
    rowCol: [
      { width: '630rpx', height: '200rpx' },
      { width: '60%', height: '32rpx' },
      [{ width: '30%', height: '32rpx' }, { width: '30%', height: '32rpx', marginLeft: '40%' }]
    ],
    articleList: [],
    loading: false,
    // 暂时先不分页加载，直接返回全部数据，目前量很小
    pageNum: 1,
    pageSize: 5,
    namespace: 'anfou-xhouv/hrmohr',
    location: {},
    locationAuth: false,
    weather: {},
  },

  onLoad(query) {
    this.getArticle()
    this.getLocation()
  },

  getArticle() {
    this.setData({
      loading: true
    })
    api.get(getArticleList, {
      optional_properties: 'hits'
    }).then(res => {
      console.log('res==== ', res)
      this.setData({
        articleList: res?.data || []
      })
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  },

  // onPullDownRefresh() {
  //   console.log('onPullDownRefresh=====')
  //   wx.stopPullDownRefresh();
  // },

  // 获取位置信息
  getLocation() {
    const that = this
    wx.getLocation({
      type: 'wgs84', // wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success (res) {
        that.getLocal(res)
      },
      fail(error) {
        wx.getSetting({
          success(res) {
            console.log(!res.authSetting['scope.userLocation']);
            if (!res.authSetting['scope.userLocation']) {
              wx.authorize({
                scope: 'scope.userLocation',
                success() {
                  // 用户已经同意
                  //其他操作...
                  console.log("用户已经同意位置授权");
                },
                fail(){
                  console.log("用户已经拒绝位置授权");
                  that.openConfirm();//如果拒绝，在这里进行再次获取授权的操作
                }
              })
            }
          }
        });
      }
    })

  },

  //再次获取授权
  //当用户第一次拒绝后再次请求授权
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开此小程序的定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 点击获取天气
  handleClickWeather() {
    this.getLocation()
  },

  // 解析获取位置
  getLocal(data) {
    const { latitude, longitude } = data
    const that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success(res) {
        console.log('getLocal===== ', res)
        that.setData({
          locationAuth: true,
          location: {
            province: res.result.ad_info.province,
            city: res.result.ad_info.city,
            district: res.result.ad_info.district,
            address: res.result.address,
            adcode: res.result.ad_info.adcode,
            latitude,
            longitude
          }
        })
        api.get(weatherApi, {
          key: GAODE_MAP,
          city: res.result.ad_info.adcode,
        }).then(res => {
          console.log('getLocal map===== ', res)
          that.setData({
            weather: res?.lives?.[0] || {}
          })
        })
      },
      fail(error) {
        console.log(error)
        wx.showToast({
          title: '出错了，换个姿势试试'
        })
      },
      complete: function (res) {
        console.log('complete====', res);
      }
    })
  },

  // 跳转到文章详情页
  goDetailPage(e) {
    const item = e.currentTarget.dataset.item
    console.log('goDetailPage===== ', e, item)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${item.id}&slug=${item.slug}&namespace=${this.data.namespace}`
    })
  },

  // 跳转到搜索页
  goSearchPage() {
    console.log('goSearchPage===')
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
});
