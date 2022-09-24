// pages/mediaIDetail/index.js
import { commonServer } from '../../server/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '详情',
        marker: {},
        mediaId: null
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
                mediaId: data.mediaId
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})