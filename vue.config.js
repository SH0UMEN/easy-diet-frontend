const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    }
  },

  configureWebpack: {
    output: {
      hotUpdateMainFilename: 'static/hot-update.json',
      hotUpdateChunkFilename: 'static/hot-update.js',
      clean: true
    },
  }
});