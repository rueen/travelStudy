import request from '../request';

const memberServer = {
    // 获取用户详情
    async info(data = {}){
        return await request({ url: `/member/info`, data });
    },
    // 修改头像
    async editAvatar(data = {}){
        return await request({ url: `/member/editAvatar`, data, method: "POST", });
    },
    // 修改昵称
    async editNickName(data = {}){
        return await request({ url: `/member/editNickName`, data, method: "POST", });
    }
}

export default memberServer;