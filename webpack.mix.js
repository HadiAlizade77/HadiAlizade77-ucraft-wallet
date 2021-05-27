const mix = require('laravel-mix');
// const tailwindcss = require('tailwindcss')
require('dotenv').config();
const path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'resources/js/src')
        ],
        alias: {
            '@': path.resolve(__dirname, 'resources/js/src'),
            '@assets': path.resolve(__dirname, 'resources/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /(node_modules)/,
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]
    }
})
    .setPublicPath('public')
    // This will copy files from static folder
    // directly into dist folder
    .copy('resources/js/src/assets', 'public')
    // This will process our entry point (app.js)
    // into the dist/js folder
    .js('resources/js/src/index.js', 'public/js')
    .react();
