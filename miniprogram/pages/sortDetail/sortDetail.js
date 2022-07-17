import api from '../../api/require'
import {articleDetail} from "../../api/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        rowCol: [
            { width: '630rpx', height: '200rpx' },
            { width: '60%', height: '32rpx' },
            [{ width: '30%', height: '32rpx' }, { width: '30%', height: '32rpx', marginLeft: '40%' }]
        ],
        id: '',
        articleList: [],
        loading: false,
        namespace: 'anfou-xhouv/hrmohr'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id, namespace } = options
        this.setData({
            id,
            namespace
        })
        this.getArticleList(id)
    },

    // 请求文章列表
    getArticleList(id) {
        this.setData({
            loading: true
        })
        api.get(`/api/v2/repos/${id}/docs`, {
            optional_properties: 'hits'
        }).then(res => {
            console.log('getArticleList res==== ', res)
            this.setData({
                articleList: res?.data || []
            })
        }).finally(() => {
            this.setData({
                loading: false
            })
        })
    },

    // 跳转到文章详情页
    goDetailPage(e) {
        const item = e.currentTarget.dataset.item
        console.log('goDetailPage===== ', item)
        wx.navigateTo({
            url: `/pages/detail/detail?id=${item.id}&slug=${item.slug}&namespace=${this.data.namespace}`
        })
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