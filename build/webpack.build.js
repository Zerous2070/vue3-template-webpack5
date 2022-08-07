const { assetsPath, env, config } = require('./utils');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const rm = require('rimraf');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackMd5Zip = require('./webpack-md5-zip');

const base = require('./webpack.base');

const webpackConfig = merge(base, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: assetsPath('js/[name].[fullhash:8].js'),
        publicPath: config.assetsPublicPath,
        chunkFilename: assetsPath('js/[name].[fullhash:8].js'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[fullhash:8].css'),
            ignoreOrder: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: 'body',
            scriptLoading: 'blocking',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                useShortDoctype: true
            },
            chunksSortMode: 'auto'
        }),
        new webpack.ids.HashedModuleIdsPlugin()
    ],
    performance: {
        hints: 'warnings',
        assetFilter: assetFilename => {
            return assetFilename.endsWidth('.js');
        }
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            cacheGroups: {
                styles: {
                    name: 'app',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true
                },
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_debugger: env === 'build:prod',
                        drop_console: env === 'build:prod'
                    },
                    format: {
                        comments: true
                    }
                }
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                }
            })
        ]
    }
});

// 是否开启生产环境gzip
if (config.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[file].gz',
            test: /\.(js|css)$/,
            threshold: 10240
        })
    );
}

if (config.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

const spinner = ora('building for production');
spinner.start();

if (config.zip) {
    webpackConfig.plugins.push(
        new WebpackMd5Zip({
            format: 'zip',
            path: config.zip.path,
            name: config.zip.name
        })
    );
}

rm(path.join(path.resolve(__dirname, '../dist'), 'static'), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(
            `${stats.toString({
                assets: true,
                assetsSort: '!size',
                assetsSpace: 100,
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            })}\n\n`
        );

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }

        const buildTime = new Date();
        console.log(chalk.cyan(`Build complete at ${buildTime} \n`));
    });
});
