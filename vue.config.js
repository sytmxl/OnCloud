// vue.config.js

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'border-radius-base': '10px', // 设置全局圆角值
            // 'btn-border-radius-base': '10px',
            // 其他自定义变量
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      // '/user/': {
      //   target: 'http://10.251.253.54:8080/user/',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/user': ''
      //   },
      // },
      '/jwt/': {
        target: 'http://10.251.253.54:8080/jwt/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/jwt': ''
        },
      },
    }
  }

});
