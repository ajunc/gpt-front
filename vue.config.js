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
    },
    css: {
        //查看CSS属于哪个css文件
        // sourceMap: true,
        loaderOptions: {
            scss: {
                // additionalData: `@import "@/theme-customer.scss";`,
                sassOptions: { outputStyle: "expanded" }
            }
        }
    }
}
