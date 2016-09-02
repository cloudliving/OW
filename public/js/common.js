// 模板解析方法
String.prototype.format = function(obj){
	var str = this.valueOf()

	// 替换{##}里内容
	str = str.replace(/{#(\w+(\.\w+)*)#}/g, function(match, key){
		return utils.getValue(obj, key)
	})

	// 替换 data-repeat
	str = str.replace(/<!-- data-repeat -->(.*data-repeat="(\w+)\sin\s(\w+)".*)<!-- end data-repeat -->/g, function(self, match, key, _obj){
		var repeat = '',
			_data = obj[_obj],
			re =  new RegExp(key + '\\.(\\w+)', 'g')

		for (var i = 0; i < _data.length; i++) {
			repeat += match.replace(re, function(a, b){
				return utils.getValue(_data[i], b)
			})					
		}
		return repeat
	})

	return str
}

// 工具对象
var utils = {}

// 获取对象属性值
utils.getValue = function(obj, attr){
	var ary = attr.split('.'), 
		_data

	if (ary.length>1) {
		_data = obj[ary[0]]
		for (var i = 1; i < ary.length; i++) {
			_data = _data[ary[i]]
		}
	} else {
		_data = obj[attr]
	}

	return _data
}

// 解析search
utils.parseSearch = function(){
	var search = (arguments[0] || location.search).slice(1), obj = {}
	if (!search) return

	search.split('&').forEach(function(e){
		obj[e.split('=')[0]] = e.split('=')[1]
	})
	
	return obj
}

// skip animation
;(function(){
	var body = $('body'),
		a = $('a')

	setTimeout(function(){
		body.removeClass('uk-animation-fade')
	}, 850)

	a.click(function(e){
		console.log(e.target.href)
		if (!e.target.hasAttributes('j-dull')) {
			body.addClass('leave')
		}
	})
})()

// nav
;(function(){
	var nav = $('.nav'),
		w = $(window),
		wh = w.height(),
		ww = w.width(),
		s, os, difference  // scroll and oldScroll

	if (ww>768) {
		w.on('scroll', function(e){
			os = s
			s = w.scrollTop()
			difference = s - os > 0 ?  'b' : 't'

			switch (difference) {
				case 'b':
					s > wh ? nav.addClass('z-hide') : nav.addClass('z-float')
					break;
				case 't':
					s == 0 ? nav.removeClass('z-float') : nav.removeClass('z-hide')
					break;	
			}
		})
	}
})()