// custom-tab-bar/index.js
import TabMenu from './data';

Component({
    data: {
        active: TabMenu[0],
        list: TabMenu,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e) {
            const { currentTarget: { dataset: { item } } } = e;

            this.setData({
                active: item
            });
            wx.switchTab({
                url: item.url.startsWith('/') ? item.url : `/${item.url}`
            });
        },

        init(){
            const page = getCurrentPages().pop();
            const route = page ? page.route.split('?')[0] : '';
            const index = this.data.list.findIndex(
                (item) => (item.url.startsWith('/') ? item.url.substr(1) : item.url) === `${route}`,
            );
            this.setData({
                active: TabMenu[index]
            });
        }
    }
})
