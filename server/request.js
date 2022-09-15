import config from '../config';
import { navigateTo } from '../utils/navigate';

const request = async (
    {url = '/', data = {}, method = 'GET', isShowLoading = false, isHideFailTips = true} = {}
  ) => {
    return new Promise(async (resolve, reject) => {
        if(isShowLoading){
            wx.showLoading()
        }
        wx.request({
            url: `${config.baseURL}${url}`,
            data,
            method,
            success(res) {
                const { returnCode, msg, data } = res.data;
                if(`${returnCode}` === '0014'){
                    // 需要重新授权登录
                    navigateTo({
                        router: 'Login'
                    })
                } else if(`${returnCode}` === '200'){
                    resolve({
                        success: true,
                        data
                    })
                } else if(`${returnCode}` === '0011') {
                    if(isHideFailTips){
                        wx.showToast({
                            title: msg,
                            icon: 'none'
                        });
                    }
                    reject({
                        success: false,
                        msg
                    });
                }
            },
            complete(){
                setTimeout(() => {
                    wx.hideLoading()
                }, 6000)
            }
        })
    })
}
export default request;
export {
  request
};