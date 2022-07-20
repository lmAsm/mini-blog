import Toast from 'tdesign-miniprogram/toast/index';
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        code: '',
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('app.globalData=== ', app.globalData)
        app.globalData.userInfo !== '{}' && this.setData({
            userInfo: JSON.parse(app.globalData.userInfo)
        })
    },

    // 点击登录
    handleClickLogin() {
        if (this.data.userInfo.nickName) {
            return
        }
        this.setData({
            visible: true
        })
    },

    // 退出登录
    logout() {
        app.globalData.userInfo = '{}'
        wx.removeStorageSync('user')
        this.setData({
            userInfo: {}
        })
    },

    confirmHandle() {
        const that = this
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途
            lang: 'zh_CN',
            success(data) {
                app.globalData.userInfo = data.userInfo
                app.globalData.haveAuth = true
                Toast({
                    context: this,
                    selector: '#t-toast',
                    message: '登录成功',
                });
                that.setData({
                    userInfo: data.userInfo,
                    visible: false
                })
                try {
                    wx.setStorageSync('user', JSON.stringify(data.userInfo))
                } catch (e) { }
            },
            fail(error) {
                console.log('error==== ', error)
                that.setData({
                    visible: false
                })
                Toast({
                    context: this,
                    selector: '#t-toast',
                    message: '取消登录',
                });
            }
        })
    },

    cancelHandle() {
        this.setData({
            visible: false
        })
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
        return {
            title: '快来看这里的文章，总结的很棒~',
            path: 'pages/index/index', // 好友点击分享之后跳转到的小程序的页面
            desc: '安否的个人博客',  // 看你需要不需要，不需要不加
        }
    }
})