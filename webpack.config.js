const path = require("path");
const webpack = require("webpack");

module.exports = {
	name: "study-app-webpack",
	mode: "development",
	devtool: "eval",
	resolve: {
		extensions: [".js", ".jsx"]
	},

	entry: {
		app: ["./client"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								targets: {
									browsers: [
										"> 5% in KR",
										"last 2 chrome version"
									]
								},
								debug: true
							}
						],
						"@babel/preset-react"
					],
					plugins: [
						"@babel/plugin-proposal-class-properties",
						"react-hot-loader/babel"
					]
				}
			},
			{
				test: /\.scss?/,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /node_modules/
			}
		]
	},
	plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "app.js"
	}
};
