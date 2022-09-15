// components/nav/index.js
const { globalData } = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        isGoBack: {
            type: Boolean,
            value: true
        },
        isShowLocation: {
            type: Boolean,
            value: true
        },
        background: {
            type: String,
            value: '#fff'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        statusBarHeight: globalData.statusBarHeight,
        navbarHeight: 44 + globalData.statusBarHeight
    },
    
    lifetimes: {
        ready() {
            const page = getCurrentPages();
            if(page.length <= 1){
                this.setData({
                    isGoBack: false
                })
            }
        },
        attached(){
            const navbarHeight = globalData.isIos ? 44 : 48;
            this.setData({
                navbarHeight: navbarHeight + globalData.statusBarHeight
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goBack(){
            wx.navigateBack();
        }
    }
})
