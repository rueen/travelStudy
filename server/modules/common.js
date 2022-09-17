import request from '../request';

const commonServer = {
    // 获取注册协议
    async protocol(data = {}){
        return await request({ url: `/common/protocol`, data });
    },
    // 获取隐私政策
    async policy(data = {}){
        return await request({ url: `/common/policy`, data });
    },
    // 数字人问答-帮助中心类别
    async faqCate(data = {}){
        return await request({ url: `/common/faqCate`, data });
    },
    // 数字人问答-帮助中心列表
    async faqList(data = {}){
        return await request({ url: `/common/faqList`, data });
    },
    // 数字人问答-帮助中心详情
    async faqInfo(data = {}){
        return await request({ url: `/common/faqInfo`, data });
    }
}

export default commonServer;