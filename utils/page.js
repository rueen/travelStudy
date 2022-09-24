// 页面通信
import routeMap from './routeMap';

export default class PM {
    constructor() {
        this.$$cache = {};
    }

    add(pageModel) {
        let pagePath = this._getPageModelPath(pageModel);

        this.$$cache[pagePath] = pageModel;
    }

    get(pagePath) {
        console.log(routeMap[pagePath], 'routeMap[pagePath]')
        if(routeMap[pagePath]){
            return this.$$cache[routeMap[pagePath].replace(/\/(.*)/, '$1')];
        } else {
            return this.$$cache[pagePath];
        }
    }

    delete(pageModel) {
        try {
            delete this.$$cache[this._getPageModelPath(pageModel)];
        } catch (e) {
        }
    }

    _getPageModelPath(page) {
        // 关键点
        return page.__route__;
    }
}