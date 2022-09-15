// pages/login/index.js
import { commonServer } from '../../server/index';
import { navigateTo } from '../../utils/navigate';
const app = getApp();
const safeArea = app.globalData.safeArea || {};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: `${safeArea.height}px`
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

    },

    getPhoneNumber (e) {
        console.log(e.detail.code)
    },

    // 打卡注册协议
    async openProtocolPage(){
        const { success, data } = await commonServer.protocol();

        if(success){
            navigateTo({
                router: 'WebViewPage',
                extras: {
                    title: '注册协议',
                    content: data.content
                }
            })
        }
    },
    // 打卡隐私政策页面
    async openPolicyPage(){
        const { success, data } = await commonServer.policy();

        if(success){
            navigateTo({
                router: 'WebViewPage',
                extras: {
                    title: '隐私政策',
                    content: data.content
                }
            })
        }
    }
})