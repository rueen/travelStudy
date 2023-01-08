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
    },
    // 获取景点列表
    async scenicList(data = {}){
        return await request({ url: `/common/scenicList`, data });
    },
    // 获取景区详情
    async scenicInfo(data = {}){
        return await request({ url: `/common/scenicInfo`, data });
    },
    // 图片上传
    async upload(data = {}){
        return await request({ 
            url: "/common/upload",
            data: data.buffer,
            method: "POST",
            header: {
                'content-type': data.contentType,
                "Platform": 50,
				"Authorization": wx.getStorageSync('token')
            },
         });
    }
}

export default commonServer;