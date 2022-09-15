const ENV = 'TEST';

const base = {
    platform: 50
}
const config = {
    PROD: {
        baseURL: '',
        ...base
    },
    TEST: {
        baseURL: 'https://padapp.ontheway168.cn/api/index.php',
        ...base
    }
}

export default config[ENV];