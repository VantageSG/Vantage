const { environment } = require('@rails/webpacker')
const path = require('path');
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

const config= {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          "../../theme.config$": path.join(__dirname, "../../app/assets/src/theme.config"),
          "../semantic-ui/site": path.join(__dirname, "../../app/assets/src/site")
        }
    },
    module: {
        //CSS, SASS
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
