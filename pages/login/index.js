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
        height: `${safeArea.height}px`,
        isAgree: false,
        userInfo: null, // 存储微信用户信息
        phone: null // 存储用户手机号
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
    
    handleLogin(){
        this.modal = this.selectComponent("#modal");
        if(this.modal){
            this.modal.show();
        }
    },

    async checkboxChange(){
        const { isAgree } = this.data;
        
        if(!isAgree){
            const { success } = await this.getUserProfile();
            if(success){
                this.setData({
                    isAgree: true
                })
            } else {
                this.setData({
                    isAgree: false
                })
            }
        } else {
            this.setData({
                isAgree: false
            })
        }
    },

    wxLogin() {
        return new Promise((resolve) => {
            wx.login({
                success: res => {
                    console.log('login code', res.code)
                    resolve(res.code);
                }
            });
        })
    },

    async getPhoneNumber (e) {
        const { code } = e.detail;
        const { success, data } = await authServer.phoneNumber({
            code
        });

        if(success){
            this.setData({
                phone: data.phone
            }, () => {
                this.login();
            })
        }
    },

    getUserProfile(){
        return new Promise(resolve => {
            wx.getUserProfile({
                desc: '用于完善会员资料',
                success: (res) => {
                    console.log('userinfo:', res)
                    this.setData({
                        userInfo: res
                    }, () => {
                        resolve({
                            success: true
                        })
                    })
                },
                fail: (res) => {
                    console.log(res)
                    resolve({
                        success: false
                    })
                }
            })
        })
    },

    async login(){
        const { userInfo, phone } = this.data;
        const { encryptedData, iv } = userInfo;
        const code = await this.wxLogin();
        const { success, data } = await authServer.wxLogin({
            code, phone, encryptedData, iv
        });
        if(success){
            wx.showToast({
                title: '登录成功',
                icon: 'success'
            })
            if(this.modal){
                this.modal.close();
            }
            wx.setStorageSync('token', data.token);
            wx.setStorageSync('userInfo', data);
            let rememberRouter = wx.getStorageSync('rememberRouter');
            console.log(rememberRouter)
            app.pages.get(rememberRouter) && app.pages.get(rememberRouter).refresh();
            // 原路返回
            wx.navigateBack();
            wx.removeStorageSync('rememberRouter');
        }
    },

    // 打开注册协议
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
    // 打开隐私政策页面
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