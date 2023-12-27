const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {  //之后就使用/api代指根路径
        target: 'http://localhost:8088', // 这是根路径
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
