// pages/map/index.js
import { commonServer } from '../../server/index';
import { navigateTo } from '../../utils/navigate';

const app = getApp();
const safeArea = app.globalData.safeArea || {};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: `${safeArea.height}px`,
        latitude: 29.496852,
        longitude: 120.917105,
        markers: null,
        curMarkerItem: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 获取景点列表
        this.scenicList();
    },

    async scenicList(){
        let markers = [];
        const { success, data } = await commonServer.scenicList();

        if(success){
            data.forEach((item, index) => {
                markers.push({
                    id: item.id - 0,
                    latitude: item.lat,
                    longitude: item.lng,
                    width: 50,
                    height: 50,
                    iconPath: '../../image/location.png',
                    title: item.title,
                    address: item.address,
                    camp: item.camp,
                    task: item.task
                })
            })
            this.setData({
                markers
            })
        }
    },

    async markertap(e){
        const { markerId } = e;
        const { markers } = this.data;
        const curMarkerItem = markers.filter(item => item.id === markerId)[0];
        const media = await this.scenicInfo(curMarkerItem);
        curMarkerItem.media = media;
        this.setData({
            curMarkerItem
        }, () => {
            this.modal = this.selectComponent("#modal");
            if(this.modal){
                this.modal.show();
            }
        })
    },

    async scenicInfo(marker){
        const { success, data } = await commonServer.scenicInfo({
            id: marker.id
        });
        if(success){
            return data.media;
        }
        return null;
    }
})