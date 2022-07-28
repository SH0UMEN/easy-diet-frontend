const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    assetsDir: 'static',

    devServer: {
		devMiddleware: {
			writeToDisk: true
		}
	},

    configureWebpack: {
		output: {
			hotUpdateMainFilename: 'static/[runtime].[fullhash].hot-update.json',
			hotUpdateChunkFilename: 'static/[id].[fullhash].hot-update.js',
			clean: true
		},
	},

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
});
