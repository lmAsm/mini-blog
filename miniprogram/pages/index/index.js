const app = getApp()
import { login } from '../../api/api'
import api from '../../api/require'

Page({
  data: {
    showUploadTip: false,
  },

  onLoad(query) {
    console.log('onLoad=== ')
  },

  // 跳转到搜索页
  goSearchPage() {
    console.log('goSearchPage===')
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
});
