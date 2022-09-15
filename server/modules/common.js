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
}

export default commonServer;