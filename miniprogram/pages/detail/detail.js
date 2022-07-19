import { articleDetail, getArticleList, baseUrl } from '../../api/api'
import api from '../../api/require'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        rowCol: [
            { width: '660rpx', height: '32rpx' },
            { width: '100%', height: '32rpx' },
            { width: '100%', height: '32rpx' },
            { width: '100%', height: '32rpx' },
            { width: '100%', height: '32rpx' },
            { width: '100%', height: '32rpx' },
        ],
        loading: false,
        id: '',
        slug: '',
        namespace: 'anfou-xhouv/hrmohr',
        articleData: {},
        article: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('detailpage onLoad=== ', options)
        const { id, slug, namespace } = options
        this.setData({
            id,
            slug,
            namespace
        })
        this.getArticleDetail(id, slug, namespace)
    },


    // 获取文章详情
    getArticleDetail(id, slug, namespace) {
        this.setData({
            loading: true
        })
        const that = this
        console.log('getArticleDetail==== ', id, slug)
        api.get(`${baseUrl}/api/v2/repos/${namespace}/docs/${id}`, {
            optional_properties: 'hits'
        }).then(res => {
            console.log('getArticleDetail res==== ', res)

            let obj = app.towxml(res?.data?.body || {},'markdown',{
                // theme:'light',
                events:{
                    tap:(e)=>{
                        console.log('tap',e);
                    }
                }
            });
            this.setData({
                article: obj,
                articleData: res?.data || {}
            })
        }).finally(() => {
            this.setData({
                loading: false
            })
        })
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