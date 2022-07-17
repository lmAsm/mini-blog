import api from "../../api/require";
import { sortList } from "../../api/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        rowCol: [
            { width: '630rpx', height: '200rpx' },
            { width: '60%', height: '32rpx' },
            [{ width: '30%', height: '32rpx' }, { width: '30%', height: '32rpx', marginLeft: '40%' }]
        ],
        sortList: [],
        pictureList: {
            base: '../../images/pic_2.png',
            typeScript: '../../images/typescript.png',
            打包构建: '../../images/Webpack.png',
            面试: '../../images/面试.png',
            涨点知识: '../../images/知识.png',
            react: '../../images/react.png',
            后端: '../../images/后端.png',
            vue: '../../images/Vue.png',
            数据库: '../../images/mysql.png',
            nginx: '../../images/Nginx.png',
            git: '../../images/git.png',
            小程序: '../../images/小程序.png',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSortList()
    },

    getSortList() {
        this.setData({
            loading: true
        })
        api.get(sortList, {
            type: 'Book'
        }).then(res => {
            console.log('sortList==== ', res.data)
            let list = res?.data || []
            list = list.filter(item => item.name != '博客专栏')
            console.log('sortList22==== ', res.data)
            list.forEach(item => {
                item.picture = this.data.pictureList?.[item.name] || this.data.pictureList.base
            })

            this.setData({
                sortList: list
            })
        }).finally(() => {
            this.setData({
                loading: false
            })
        })
    },

    // 跳转到分类详情页
    goSortDetail(e) {
        const item = e.currentTarget.dataset.item
        console.log('goDetailPage===== ', e, item)
        wx.navigateTo({
            url: `/pages/sortDetail/sortDetail?id=${item.id}&slug=${item.slug}&namespace=${item.namespace}`
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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