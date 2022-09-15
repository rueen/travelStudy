// app.js
App({
    onLaunch() {
        this.getSystemInfo(this);
    },
    globalData: {
        isIos: false,
        userInfo: null,
        screenHeight: null,
        safeArea: {},
        statusBarHeight: 20 // 状态栏高度
    },
    getSystemInfo: function(_this){
        wx.getSystemInfo({
            success (res) {
                const isIos = !!(res.system.toLowerCase().search('ios') + 1);
                _this.globalData.isIos = isIos;
                _this.globalData.screenHeight = res.screenHeight;
                _this.globalData.safeArea = res.safeArea;
                _this.globalData.statusBarHeight = res.statusBarHeight;
            }
        })
    }
})
