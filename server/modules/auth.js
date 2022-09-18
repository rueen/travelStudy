import request from '../request';

const authServer = {
    // 小程序授权获取手机号
    async phoneNumber(data = {}){
        return await request({ url: `/auth/phoneNumber`, data, method: 'POST' });
    },
    // 小程序授权登录
    async wxLogin(data = {}){
        return await request({ url: `/auth/wxLogin`, data, method: 'POST' });
    }
}

export default authServer;