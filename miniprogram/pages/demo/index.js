Page({
    data: {
        animationClass: ''
    },
    onLoad: function (options) {

    },
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