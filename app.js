// app.js
import PM from '/utils/page.js';
let pages = new PM();
var QQMapWX = require('./utils/qqmap-wx-jssdk');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: 'P3ABZ-CKKK4-PWZUK-DS6DM-TVEW5-FHF6B' // 必填
});

App({
    onLaunch() {
        this.pages = pages;
        this.getSystemInfo(this);
        this.getLocation()
    },
    globalData: {
        isIos: false,
        userInfo: null,
        screenHeight: null,
        safeArea: {},
        statusBarHeight: 20, // 状态栏高度
        navbarHeight: null, // 导航栏高度
        contentHeight: null, // 内容高度
    },
    getSystemInfo: function(_this){
        wx.getSystemInfo({
            success (res) {
                const isIos = !!(res.system.toLowerCase().search('ios') + 1);
                _this.globalData.isIos = isIos;
                _this.globalData.screenHeight = res.screenHeight;
                _this.globalData.safeArea = res.safeArea;
                _this.globalData.statusBarHeight = res.statusBarHeight;
                const navbarHeight = 44 + res.statusBarHeight;
                _this.navbarHeight = navbarHeight;
                _this.globalData.contentHeight = res.safeArea.height - 44;
            }
        })
    },
    getLocation: function(){
        console.log(3)
        return new Promise(resolve => {
            wx.getFuzzyLocation({
                type: 'wgs84',
                success (res) {
                    const latitude = res.latitude
                    const longitude = res.longitude;
                    qqmapsdk.reverseGeocoder({
                        location: {
                            latitude,
                            longitude
                        },
                        success: function (res) {
                            const result = res.result || {};
                            const address_component = result.address_component || {};
                            const city = address_component.city;
                            wx.setStorageSync('city', city);
                            resolve({
                                success: true,
                                res
                            })
                        },
                        fail: function (res) {
                            console.log(res)
                            resolve({
                                success: false,
                                res
                            })
                        },
                        complete: function (res) {
                        }
                    });
                },
                fail(res){
                    console.log(res)
                }
            })
        })
    }
})
