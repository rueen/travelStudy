// pages/usercenter/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        app.pages.add(this);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
    },
    refresh(){
        this.selectComponent("#head").refresh();
    },
})