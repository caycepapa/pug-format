const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');

const pugFiles = globule.find('src/**/*.pug', {
    ignore: [ 'src/**/_*.pug' ]
});

const MODE = "development";
// production

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

const buildDefault = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/index.js",

    // ファイルの出力設定
    output: {
        path: path.resolve(__dirname, './public/assets/'),
        filename: './js/bundle.js',
    },

    module: {
        rules: [
            // Sassファイルの読み込みとコンパイル
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: [
                    // CSSファイルを書き出すオプションを有効にする
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // PostCSS側でもソースマップを有効にする
                            // sourceMap: true,
                            postcssOptions: {
                            plugins: [
                                // Autoprefixerを有効化
                                // ベンダープレフィックスを自動付与する
                                ["autoprefixer", { grid: true }],
                            ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,
                            implementation: require('sass')
                        },
                    },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true,
                            root: path.resolve(__dirname, 'src')
                        }
                    },
                ]
            },
            {
                // node_module内のcss
                test: /node_modules\/(.+)\.css$/,
                use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: { url: false },
                },
                ],
                sideEffects: true,
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                            ]
                        }
                    }
                ]
            }
        ],
    },

    resolve: {
        extensions: [ '.ts', '.js', '.json' ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/style.css",
        }),
    ],
    
    target: ["web", "es5"],
}


pugFiles.forEach((pug) => {
    const html = pug.replace(/^src\/pug/, 'public').replace('.pug', '.html');
    buildDefault.plugins.push(
        new HtmlWebpackPlugin({
            inject: false,
            filename: `${path.resolve(__dirname, html)}`,
            template: pug,
            data: require(`${path.resolve(__dirname, 'src')}/pug/data/global.js`)
        })
    )
});

module.exports = buildDefault;