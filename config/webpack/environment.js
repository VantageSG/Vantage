const { environment } = require('@rails/webpacker')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config= {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          "../../theme.config$": path.join(__dirname, "../../app/assets/src/theme.config"),
          "../src/site": path.join(__dirname, "../../app/assets/src/site")
        }
    },
    module: {
        rules: [
          {
            test: /\.(less)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader"
            ]
        }
        ]
    },
    plugins: [
        // this handles the bundled .css output file
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
            //filename: "./css/[name].css"
        })
    ]
};

environment.config.merge(config)

module.exports = environment
