// pages/service/index.js
import { commonServer } from '../../server/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        faqCate: [], // 问题分类
        qaList: [], // 问答列表
        icons: {
            1: 'zixun1',
            2: 'zixun2',
            3: 'feedback'
        },
        delay: 500
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.faqCate();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    async faqCate(){
        const { success, data } = await commonServer.faqCate();
        if(success){
            data.forEach(item => {
                item.icon = this.data.icons[item.id]
            })
            this.setData({
                faqCate: data
            })
        }
    },

    bindtapItem(e){
        const { detail: { item } } = e;
        const qaList = JSON.parse(JSON.stringify(this.data.qaList));
        const questions = item;
        qaList.push({
            questions
        });
        this.setData({
            qaList
        },() => {
            const _qaList = JSON.parse(JSON.stringify(this.data.qaList));
            _qaList.forEach(async item => {
                const questions = item.questions;
                if(questions && !item.answers){
                    const answers = await this.faqList(questions.id);
                    item.answers = answers;
                }
            })
            this.pageScrollToBottom();
            setTimeout(() => {
                this.setData({
                    qaList: _qaList
                }, () => {
                    this.pageScrollToBottom();
                })
            }, this.data.delay)
        });
    },

    async faqList(cateId){
        const { success, data } = await commonServer.faqList({
            cateId
        });
        if(success){
            return data;
        }
    },

    async getFaqInfo(e){
        const { currentTarget: { dataset: { item} } } = e;
        const qaList = JSON.parse(JSON.stringify(this.data.qaList));
        const questions = item;
        qaList.push({
            questions
        });
        this.setData({
            qaList
        },() => {
            const _qaList = JSON.parse(JSON.stringify(this.data.qaList));
            _qaList.forEach(async item => {
                const questions = item.questions;
                if(questions && !item.answers){
                    const answers = await this.faqInfo(item.questions.id);
                    item.answers = answers;
                }
            })
            this.pageScrollToBottom();
            setTimeout(() => {
                this.setData({
                    qaList: _qaList
                }, () => {
                    this.pageScrollToBottom();
                })
            }, this.data.delay)
        });
    },

    async faqInfo(id){
        const { success, data } = await commonServer.faqInfo({
            id
        });
        if(success){
            return [data];
        }
    },

    pageScrollToBottom(){
        wx.createSelectorQuery().select('#container').boundingClientRect(function(rect){
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: rect.height
            })
        }).exec()
    }
})