fis.set('version', require('./package.json').version)
fis.set('project.ignore', [
		'.git/**',
		'node_modules/**',
		'output/**',
		'fis-conf.js',
		'gulpfile.js',
		'package.json',
		'README.md'
	])



fis
	.media('prod')
	.match('::package', {
		postpackager: fis.plugin('loader')
	})

	// global conf
	.match('!*.html', {
		useHash: true,
		domain: 'http://cloudliving-img.b0.upaiyun.com/static/Home/ow'
	})

	// move
	.match('public/images/(**)', {
		release: '/images/$1',
		useHash: false
	})
	.match('public/js/(**)', {
		release: '/${version}/js/$1'
	})
	.match('public/lib/(**)', {
		release: '/lib/$1',
		useHash: false
	})
	.match('public/media/(**)', {
		release: '/media/$1',
		useHash: false
	})

	// pack
	.match('public/css/*', {
		packTo: '/${version}/css/ow.min.css'
	})

	// optimize
	.match('*.css', {
		preprocessor: fis.plugin('autoprefixer', {
			browsers: ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
			cascade: true
		}),
		optimizer: fis.plugin('clean-css')
	})
	.match('*.js', {
		optimizer: fis.plugin('uglify-js')
	})



