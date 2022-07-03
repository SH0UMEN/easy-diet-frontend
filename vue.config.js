const { defineConfig } = require('@vue/cli-service')
const path = require('path');

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
      hotUpdateMainFilename: 'static/[runtime].[fullhash].hot-update.json',
      hotUpdateChunkFilename: 'static/[id].[fullhash].hot-update.js',
    },
  }
})