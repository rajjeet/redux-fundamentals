var path = require('path');

module.exports = {
    entry: ["./public/js/main.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public/js/build')
    },
    devtool: "source-map",
    module: { // Loaders apply transformations before a file is added to bundle.js
        rules: [
            {
                test: /\.js$/, //transform all .js files
                exclude: /node_modules/, // except for node_modules
                loader: 'babel-loader', // apply the babel-loader to compile the files
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'], // load the react, es2015 babel setting
                    plugins: ["@babel/plugin-proposal-object-rest-spread"]
                }
            }
        ]
    }
};

