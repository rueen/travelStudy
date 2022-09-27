// pages/service/components/shortcut/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    lifetimes: {
        attached(){
            
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindtapItem(e){
            const { currentTarget: { dataset: { item} } } = e;
            this.triggerEvent('bindtapItem', { item })
        }
    }
})
