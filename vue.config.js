// vue.config.js
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const debug = process.env.NODE_ENV !== 'production'
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // 选项...
  // 当使用基于 HTML5 history.pushState 的路由时；
  // 当使用 pages 选项构建多页面应用时。
  publicPath:process.env.prefix, // 基本路径
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: process.env.outputDir, // 构建时的输出目录
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir:"static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath:"index.html",
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing:true,
  // 多页面
  pages:undefined,
  // 编译警告
  lintOnSave:true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler:false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies:['vue-particles', 'animejs'],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap:false,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
  crossorigin:undefined,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
  integrity:false,
  // 允许对内部的webpack配置进行更细粒度的修改
  chainWebpack: config => {
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
    // config.set('externals', {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'element-ui': 'ELEMENT',
    //     'echarts': 'echarts',
    //     'axios': 'axios',
    // })
    config.entry.app = ['babel-polyfill', './src/main.ts'];
    config.module.rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        cacheGroups: {
          vendor: {
            name: 'vendor',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: 20,
            minSize: 3000,
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/
          },
          common: {
            name: 'common',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: 10,
            minSize: 3000,
            chunks: 'all',
            test: /[\\/]src[\\/]/,
          },
        }
      })
    }
    // config.output.filename('[name].[hash].js')
  },
  // 合并webpack 配置项
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: "gzip",
        test: /\.js$|\.html$|\.css$|\.ttf$|\.woff$/, //匹配文件名
        threshold: 10240, //对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false //是否删除源文件
      }),
      // new TerserPlugin({
      //     terserOptions: {
      //         ecma: undefined,
      //         warnings: false,
      //         parse: {},
      //         compress: {
      //             drop_console: true,
      //             drop_debugger: false,
      //             pure_funcs: ['console.log'] // 移除console
      //         }
      //     },
      // })
    ],
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production' ? { ignoreOrder: false } : false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 自动注入全局变量样式
        prependData: `
                    @import "src/assets/css/reset.scss";
                `
      },
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            // rootValue: 37.5, // vant官方使用的是37.5, 对根元素大小进行设置。类似px2rem中的remUnit参数
            unitPrecision: 8,
            rootValue: 192,
            minPixelValue: 2, // 所有小于2px的样式都不被转换
            selectorBlackList: ['.van'], // 忽略转换正则匹配项
            propList: ['*'] // 存储哪些将被转换的属性列表
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
  },
  // parallel: require('os').cpus().length > 1,
  // 反向代理
  devServer: {
    open: true, //浏览器自动打开页面
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 8911,
    overlay: {
      warnings: true,
      errors: true
    },
    https: false,
    hotOnly: true, //热更新（webpack已实现了，这里false即可）
    // proxy: {
    //     '/ap': {
    //         target: 'http://lk-wechat.imepaas.enncloud.cn', //设置你调用的接口域名和端口号 别忘了加http
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/api': '' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
    //         }
    //     }
    // }
  }
}
