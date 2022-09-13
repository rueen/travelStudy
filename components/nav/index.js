// components/nav/index.js
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
