const ENV = 'PROD';

const base = {
    platform: 50
}
const config = {
    PROD: {
        baseURL: 'https://service.unidt.com/dolly-biz/studytour-api/index.php',
        ...base
    },
    TEST: {
        baseURL: 'https://padapp.ontheway168.cn/api/index.php',
        ...base
    }
}

export default config[ENV];