Page({
    data: {
        animationClass: ''
    },
    onLoad: function (options) {

    },
    // test
    clickBtn() {
        this.setData({
            animationClass: 'animationClass'
        })
        setTimeout(() => {
            this.setData({
                animationClass: ''
            })
        }, 2000)
    }
});