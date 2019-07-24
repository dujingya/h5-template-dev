require('./check-versions')()

process.env.NODE_ENV = 'qualityAssurance'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.qa.conf')

var spinner = ora('building for qualityAssurance...')
spinner.start()

rm(path.join(config.qa.assetsRoot,  config.qa.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  qa failed with errors.\n'))
            process.exit(1)
        }
        console.log(process.env.NODE_ENV)
        console.log(chalk.cyan('  qa complete.\n'))
        console.log(chalk.yellow(
            '  Tip: qa files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
