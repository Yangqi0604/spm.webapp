const path = require('path')

const resolve = dir => path.join(__dirname, dir)
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
// const webpack = require('webpack')

module.exports = {
  assetsDir: 'static',

  devServer: {
    // host: '192.168.200.57',
    // port: '8081',
    proxy: {
      '/api/*': {
        target: '',
        ws: false,
        logger: 'debug'
      }
    }
  },

  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'window.jQuery': 'jquery'
  //     })
  //   ]
  // },
  // 配置css前缀,px转rem
  css: {
    loaderOptions: {
      // 后处理器配置
      postcss: {
        plugins: [
          // 配置样式前缀
          autoprefixer(),
          // 把px转为rem
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@commons', resolve('src/commons'))
      .set('@utils', resolve('src/commons/utils'))
      .set('@api', resolve('src/api'))
      .set('@viewComponent', resolve('src/views/components'))
      .set('@columns', resolve('src/views/columns'))
  },

  //   baseUrl: "/",
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined
}