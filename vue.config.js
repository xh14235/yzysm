module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    // proxy: {
    //   "api": {
    //     target: "https://tianqiapi.com/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "/api"
    //     }
    //   },
    //   "/admin": {
    //     target: "http://116.236.30.222:9020",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/admin": "/admin"
    //     }
    //   },
    //   "/energy": {
    //     target: "http://116.236.30.222:9020",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/energy": "/energy"
    //     }
    //   }
    // }
    proxy: null
  }
};
