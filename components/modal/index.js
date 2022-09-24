// pages/login/components/modal/index.js
const app = getApp();
const safeArea = app.globalData.safeArea || {};

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        height: {
            type: String,
            value: `${safeArea.height/2}px`
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false,
        animation: {},
        duration: 200
    },

    /**
     * 组件的方法列表
     */
    methods: {
        show(){
            const { duration } = this.data;
            this.setData({
                isShow: true
            })
            this.animation = wx.createAnimation({
                duration
            });
            this.animation.bottom(0).step();
            this.setData({
                animation: this.animation.export()
            })
        },
        close(){
            const { height, duration } = this.data;
            this.animation.bottom(-height).step();
            this.setData({
                animation: this.animation.export()
            })
            setTimeout(() => {
                this.setData({
                    isShow: false
                })
            }, duration)
        }
    }
})
