// slider
;(function(){
	var 
		wrap = $('.slider'),
		ul = wrap.find('ul'),
		li = wrap.find('.item'),
		w = li.width(),
		offset = 0,
		grid = wrap.find('.uk-grid'),
		prev = wrap.find('.prev'),
		next = wrap.find('.next')

	if (wrap.length == 0) return

	prev.on('click', function(){
		var cur = li.filter('.active')
		if (cur.prev().length > 0) {
			offset -= w

			li.removeClass('active')
			cur.prev().addClass('active')
			ul.css({
				WebkiTtransform: 'translateX(-'+ offset +'px)',
				MsTransform: 'translateX(-'+ offset +'px)',
				OTransform: 'translateX(-'+ offset +'px)',
				transform: 'translateX(-'+ offset +'px)'
			})
		}
	})

	next.on('click', function(){
		var cur = li.filter('.active')
		if (cur.next().length > 0) {
			offset += w

			li.removeClass('active')
			cur.next().addClass('active')
			ul.css({
				WebkiTtransform: 'translateX(-'+ offset +'px)',
				MsTransform: 'translateX(-'+ offset +'px)',
				OTransform: 'translateX(-'+ offset +'px)',
				transform: 'translateX(-'+ offset +'px)'
			})
		}
	})
})()


// logic
;(function(){
	var url = {
		news: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=home_page_news_list',
		stat: {
			ow: 'http://tw.cloudliving.net/official_website.php?c=Index&a=website&action=website_browse_num_plus_one&wbid=1',
			click: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_click_num_plus_one'
		},
		form: 'http://tw.cloudliving.net/official_website.php?c=Index&a=website&action=submit_link_us'
	},
	dom = {
		newsWrap: $('.news-list'),
		form: $('form'),
		name: $('#name'),
		mail: $('#mail'),
		phone: $('#phone'),
		ctn: $('#ctn'),
	},
	template = 	'<!-- data-repeat -->'+
				'<li class="item" data-repeat="x in news" data-id="x.id">'+
					'<a class="uk-flex" href="article.html?id=x.id">'+
						'<div class="img-wrap"> '+
							'<img class="thumb" src="x.news_image">'+
						'</div>'+
						'<div class="ctn-wrap uk-flex-item-1">'+
							'<p class="title">x.news_title</p>'+
							'<p class="intro">x.news_brief</p>'+
						'</div>'+
						'<div class="info-wrap uk-hidden-small">'+
							'<p class="date">x.month_day</p>'+
							'<p class="year">x.year</p>'+
							'<span class="btn">→</span>'+
						'</div>'+
					'</a>'+
				'</li>'+
				'<!-- end data-repeat -->'
	// 访问统计
	$.get(url.stat.ow)
	dom.newsWrap.click(function(e){
		var nid = $(e.target).parents('li').data('id')
		nid && $.get(url.stat.click, {nid: nid})
	})

	$.get(url.news, function(res){
		if (res.Code == 0) {
			dom.newsWrap.append(template.format({news: res.result}))
		}
	}, 'json')

	dom.form.on('submit', function(e){
		e.preventDefault()

		var data = {
			name: dom.name.val(),
			email: dom.mail.val(),
			phone: dom.phone.val(),
			content: dom.ctn.val()
		}

		$.get(url.form, {data:JSON.stringify(data)},function(res){
			if (res.Code == 0) {
				dom.name.val('')
				dom.mail.val('')
				dom.phone.val('')
				dom.ctn.val('')

				UIkit.modal.alert("提交成功");
				setTimeout(function(){
					$('.uk-modal-close').click()
				}, 1500)
			} else {
				UIkit.modal.alert("提交失败");
				UIkit.notify('提交失败,请重试', {timeout: 1000})
			}
		}, 'json')
	})
})()