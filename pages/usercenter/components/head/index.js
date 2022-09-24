// pages/usercenter/components/head/index.js
import { navigateTo } from '../../../../utils/navigate';

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
        userInfo: wx.getStorageSync('userInfo')
    },

    /**
     * 组件的方法列表
     */
    methods: {
        refresh(){
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
        },
        login(){
            navigateTo({
                router: 'Login'
            })
        }
    }
})
