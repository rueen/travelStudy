import routeMap from './routeMap';

const navigateTo = ({ router, extras = {}}) => {
    console.log(`${routeMap[router]}?dataObj=${JSON.stringify(extras)}`)
    wx.navigateTo({
        url: `${routeMap[router]}?dataObj=${JSON.stringify(extras)}`,
        success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel && res.eventChannel.emit('acceptDataFromOpenerPage', extras)
        },
        fail: function(err) {
            console.log('====>>>', err);
            if(err.errMsg.indexOf('fail webview count limit exceed') > -1){
                wx.redirectTo({
                    url: `${routeMap[router]}?dataObj=${JSON.stringify(extras)}`,
                    success: function (res) {
                        // 通过eventChannel向被打开页面传送数据
                        res.eventChannel && res.eventChannel.emit('acceptDataFromOpenerPage', extras)
                    }
                });
            }
        }
    });
}
  
const switchTab = (router) => {
    wx.switchTab({
        url: `${routeMap[router]}`
    })
}
  
export {
    navigateTo,
    switchTab
}