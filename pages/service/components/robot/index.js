// pages/service/components/robot/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShowContent: {
            type: Boolean,
            value: false
        },
        isInit: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        delay: 400,
    },

    lifetimes: {
        attached(){
            if(this.data.isInit){
                setTimeout(() => {
                    this.setData({
                        isShowContent: true
                    })
                }, this.data.delay);
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
