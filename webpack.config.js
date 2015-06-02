module.exports = {
	entry: './app/js/app.es6.js',
	output: {
		filename: './app/js/app.js'
	},
	module: {
		loaders: [
			{ test: /\.es6.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	devtool: '#devtool'
};