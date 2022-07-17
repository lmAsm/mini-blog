const app = getApp()
import { login, getArticleList } from '../../api/api'
import api from '../../api/require'

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
    namespace: 'anfou-xhouv/hrmohr'
  },

  onLoad(query) {
    this.getArticle()
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
