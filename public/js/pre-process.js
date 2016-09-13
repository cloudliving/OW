;(function(){
	var style = document.createElement('div').style,
		flex = style.webkitFlex ||
				style.mozFlex ||
				style.msFlex ||
				style.oFlex ||
				style.flex

	if (typeof flex == 'undefined') {
		document.write('<p style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: #fff;">您的浏览器版本过低, 升级获得更好体验 <a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">谷歌浏览器</a> or <a href="http://chrome.360.cn/">360极速浏览器</a></p>')
	}

	// 小屏时显示移动端页面
	// if((window.screen.width || document.body.clientWidth) < 769 ) location.href = 'm/index.html'
})()

