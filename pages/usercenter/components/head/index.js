// pages/usercenter/components/head/index.js
import { navigateTo } from '../../../../utils/navigate';
import { memberServer, commonServer } from '../../../../server/index';

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        isLogin: !!wx.getStorageSync('token'),
        userInfo: wx.getStorageSync('userInfo'),
        isEditNickname: false
    },

    lifetimes: {
        attached(){
            this.refresh();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        refresh(){
            const token = wx.getStorageSync('token');
            this.setData({
                isLogin: !!token
            })
            if(!!token){
                // 获取用户详情
                this.getUserInfo()
            }
        },
        async getUserInfo(){
            const { success, data } = await memberServer.info();
            if(success){
                this.setData({
                    userInfo: data || {}
                })
            }
        },
        login(){
            navigateTo({
                router: 'Login'
            })
        },
        async onChooseAvatar(e) {
            const { avatarUrl } = e.detail;
            const FormData = require('../../../../utils/formData');
            let formData = new FormData();
            formData.appendFile("file", avatarUrl);
            let params = formData.getData();
            const { success,data } = await commonServer.upload(params);
            if(success){
                // 修改头像
                this.editAvatar(data.path);
            }
        },
        // 修改头像
        async editAvatar(url){
            const { success, msg } = await memberServer.editAvatar({
                avatar: url
            });
            if(success){
                this.getUserInfo();
            } else {
                wx.showToast({
                  title: msg,
                  icon: 'none'
                })
            }
        },
        // 编辑昵称
        handleEditNickname(){
            this.setData({
                isEditNickname: true
            })
        },
        nicknameOnBlur(e){
            const { detail: { value } } = e;
            
            if(value && value.trim()){
                // 修改昵称
                if(value.length > 20){
                    wx.showModal({
                        title: '提示',
                        content: '昵称不可超过20个字',
                        success (res) {}
                    })
                } else {
                    this.editNickName(value.trim());
                }
            }
            this.setData({
                isEditNickname: false
            })
        },
        // 修改昵称
        async editNickName(nickname){
            const { success, msg } = await memberServer.editNickName({
                nickname
            });
            if(success){
                this.getUserInfo();
            } else {
                wx.showToast({
                  title: msg,
                  icon: 'none'
                })
            }
        }
    }
})
