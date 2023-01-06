import routeMap from './routeMap';

const visitorRouter = ['Login', 'Index', 'Map', 'Study', 'ClockIn', 'UserCenter', 'Protocol', 'Policy']; // 游客可访问

const stopVisitor = (router) => {
    const token = wx.getStorageSync('token');
    if(visitorRouter.indexOf(router) < 0 && !token){
        // 禁止游客访问
        navigateTo({
            router: 'Login'
        });
        return false;
    }
    return true;
}

const navigateTo = ({ router, extras = {}}) => {
    console.log(`${routeMap[router]}?dataObj=${JSON.stringify(extras)}`)
    const isPass = stopVisitor(router);
    if(!isPass){
        return;
    }
    if(router === 'Login'){
        const curPage = getCurrentPages().pop();
        const curPageRoute = curPage.route.startsWith('/') ? curPage.route : `/${curPage.route}`;
        let curRouter = '';
        Object.values(routeMap).forEach((item, index) => {
            if(curPageRoute === item){
                curRouter = Object.keys(routeMap)[index];
            }
        })
        wx.setStorageSync('rememberRouter', curRouter);
    }
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
    const isPass = stopVisitor(router);
    console.log(router, isPass)
    if(!isPass){
        return;
    }
    wx.switchTab({
        url: `${routeMap[router]}`
    })
}
  
export {
    navigateTo,
    switchTab
}