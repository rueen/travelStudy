// components/layout/index.js
const { globalData } = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        navbarHeight: 44 + globalData.statusBarHeight
    },

    lifetimes: {
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

    }
})
