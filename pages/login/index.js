// pages/login/index.js
import { commonServer, authServer } from '../../server/index';
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

    wxLogin() {
        return new Promise((resolve) => {
            
            // wx.login({
            //     success: res => {
            //         console.log(res, '--res')
            //         resolve(res.code);
            //     }
            // });
        })
    },

    async getPhoneNumber (e) {
        const { code, encryptedData, iv } = e.detail;
        const { success, data } = await authServer.phoneNumber({
            code
        });

        if(success){
            console.log(1)
            
            // const _code = await this.wxLogin();
            // const { phone } = data;
            // this.handleLogin({
            //     code: _code,
            //     phone,
            //     encryptedData,
            //     iv
            // })
        }
    },

    getUserProfile(){
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                console.log(res, '--userinfo')
            },
            fail: (res) => {
                console.log(res, '--userinfo1')
            }
        })
    },

    async handleLogin(params = {}){
        const { code, phone, encryptedData, iv } = params;
        const { success, data } = await authServer.wxLogin({
            code, phone, encryptedData, iv
        });
        if(success){
            wx.setStorageSync('userInfo', data);
            let rememberRouter = wx.getStorageSync('rememberRouter');
            // 记忆路由，哪里来哪里去
            wx.redirectTo({
                url: `/${rememberRouter}`
            })
            wx.removeStorageSync('rememberRouter');
        }
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