const configs = {
    'dev:dev': {
        // 开发
        proxyTable: {},
        host: '127.0.0.1',
        port: 3301,
        assetsPublicPath: '/'
    },
    'dev:test': {
        // 测试
        proxyTable: {},
        host: '127.0.0.1',
        port: 3301,
        assetsPublicPath: '/'
    },
    'build:dev': {
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    'build:test': {
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    'build:prod': {
        zip: {
            name: 'vue3-template-webpack5',
            path: './zip/'
        },
        assetsPublicPath: '/',
        productionSourceMap: true,
        bundleAnalyzerReport: false
    }
};

module.exports = configs;
