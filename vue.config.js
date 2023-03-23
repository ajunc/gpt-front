module.exports = {
    pluginOptions: {
        proxy: {
            enabled: true,
            context: '/api',
            options: {
                target: 'http://47.254.45.52:10001',
                changeOrigin: true
            }
        }
    }
}
