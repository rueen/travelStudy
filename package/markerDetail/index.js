// pages/markerDetail/index.js
import { commonServer } from '../../server/index';
const app = getApp();
const { globalData } = app;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: `${globalData.contentHeight}px`,
        title: '详情',
        marker: {},
        mediaId: null,
        media: null // 素材
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options = {}) {
        if(options.dataObj) {
            const dataObj = JSON.parse(options.dataObj);
            const { marker } = dataObj;
            this.setData({
                title: marker.title,
                marker
            }, () => {
                this.scenicInfo();
            })
        }
    },

    async scenicInfo(){
        const { marker } = this.data;
        const { success, data } = await commonServer.scenicInfo({
            id: marker.id
        });
        if(success){
            this.setData({
                media: data.media || {}
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})