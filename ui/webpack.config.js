const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dts = require('dts-generator');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const RemoveWebpackPlugin = require('remove-webpack-plugin');
const WatchIgnorePlugin = require('webpack').WatchIgnorePlugin;
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const isProduction = false;
const dirName = __dirname;

const scssPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !isProduction
});


class DtsBundlePlugin { }
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    dts.default({
      name: 'definitions',
      project: dirName,
      out: 'typings/definitions.d.ts'
    });
    callback();
  });
};

module.exports = {
  //entry point into the app - uses "import" statements to build a tree of all the files and packages used by the site and operates on them
  entry: "./src/index.tsx",

  output: {
    //bundle
    filename: "[name].bundle.js",
    //builds into
    path: path.resolve(__dirname, 'dist'),
    //provides absolute paths so vscode can debug
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  resolve: {
    // makes it possible to import files without specifying the extension (import App from './App') instead of (import App from './App.jsx')
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      portal: path.resolve(__dirname, "src") //see **
    }
  },
  //provide inline source maps for vscode
  devtool: 'source-map',
  externals: {
    //dont bundle these into our code (the index.html includes them)
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    //"webpack-dev-server" uses these settings when you run npm start
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000
  },
  plugins: [
    new WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
    // checker plugin runs typescript gives errors
    new CheckerPlugin(),
    scssPlugin,
    // this copies static files to the dist folder
    new CopyWebpackPlugin([{
      // copy all the files from public to dist/public
      from: 'public/**/*'
    },
    {
      // copy the index file to dist/index.html
      from: 'src/index.html',
      to: 'index.html',
      transform(content, filePath) {
        // TODO: process the index.html files here
        // (prod vs. dev, versioned file references, AAD startup code (so it can redirect faster if user isnt logged in, etc))
        console.log('transforming: ' + filePath);
        return content;
      },
    }]),
    // webpack-dev-server compiles and keeps files in memory. If you want files written to the dist folder you need this plugin
    // (vscode cant debug without, because it needs the dist folder)
    new WriteFilePlugin(),
    new DtsBundlePlugin(),
    new RemoveWebpackPlugin(['./src/**/*.d.ts', './src/**/*.scss.ts'])
  ],
  module: {
    rules: [
      {
        // lint the ts and tsx files
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
          typeCheck: true,
          fix: true
        }
      },
      {
        //compile typescript files and make them available to import into other scripts
        test: /\.tsx$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.s?css$/,
        use: scssPlugin.extract({
          use: [
            { loader: 'style-loader' },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                sourceMap: true
              }
            },
            { loader: 'sass-loader' },
          ]
        })
      },
      {
        //make
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }
  // output: {
  //   filename: "bundle.js",
  //   path: __dirname + "/dist"
  // },
  // devtool: "source-map",
  // resolve: {
  //   extensions: [".ts", ".tsx", ".js", ".json"],
  // },
  // module: {
  //   rules: [{
  //     test: /\.tsx?$/,
  //     loader: "awesome-typescript-loader",
  //   }, {
  //     enforce: "pre",
  //     test: /\.js$/,
  //     loader: "source-map-loader",
  //   }]
  // },
};