const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader("vue-svg-inline-loader")
      .options({ /* ... */ })
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/includes/*.scss")
      ]
    }
  },
  outputDir: path.resolve(__dirname, "../public"),
  css: {
    sourceMap: process.env.NODE_ENV !== "production"
  }
}
