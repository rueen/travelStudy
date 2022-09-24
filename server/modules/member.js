import request from '../request';

const memberServer = {
    // 获取用户详情
    async info(data = {}){
        return await request({ url: `/member/info`, data });
    }
}

export default memberServer;