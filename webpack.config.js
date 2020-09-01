const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
const config = {
        entry: ENTRY_FILE,
        mode: MODE,
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    // ExtractCSS : CSS를 추출한다
                    use: ExtractCSS.extract([
                        {
                            loader: "css-loader"
                            // CSS를 가져옴
                        }, {
                            loader: "postcss-loader",
                            // postcss-loader : 특정 플러그인들을 css에 대해 실행
                            options: {
                                plugins() {
                                    return [autoprefixer({browsers: "cover 99.5%"})];
                                }
                            }
                        }, {
                            loader: "sass-loader"
                            // sass파일을 css파일로 변환
                        }
                    ])
                }
            ]
        },
        output: {
            path: OUTPUT_DIR,
            filename: "[name].js"
        },
        plugins: [new ExtractCSS("styles.css")],
    };
module.exports = config;