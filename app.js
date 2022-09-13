// app.js
App({
    onLaunch() {
        this.getSystemInfo(this);
    },
    globalData: {
        userInfo: null,
        screenHeight: null,
        safeArea: {}
    },
    getSystemInfo: function(_this){
        wx.getSystemInfo({
            success (res) {
                _this.globalData.screenHeight = res.screenHeight;
                _this.globalData.safeArea = res.safeArea;
            }
        })
    }
})
