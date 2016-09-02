;(function(){
	var dom = {
			newsWrap: $('.news-list'),
			next: $('.next'),
			prev: $('.prev'),
			body: $('body')
		},
		url = {
			news: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_list',
			stat: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_click_num_plus_one'
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
					'<!-- end data-repeat -->',
		page = 1, all, h = dom.newsWrap.scrollTop()

	// 访问统计
	dom.newsWrap.click(function(e){
		var nid = $(e.target).parents('li').data('id')
		nid && $.get(url.stat, {nid: nid})
	})

	$.get(url.news, function(res){
		if (res.Code == 0) {
			all = res.page_count
			dom.newsWrap.append(template.format({news: res.result}))
		}
	}, 'json')

	dom.next.click(function(e){
		if (page < all) {
			$.get(url.news, {page: page+1}, function(res){
				page++
				if (res.Code == 0) {
					dom.body.animate({scrollTop: h}, 1000)
					dom.newsWrap.html(template.format({news: res.result}))
				}
			})
		} else {
			UIkit.notify("没有了", {timeout: 1500});
		}
	})

	dom.prev.click(function(e){
		if (page > 0) {
			$.get(url.news, {page: page-1}, function(res){
				page--
				if (res.Code == 0) {
					dom.body.animate({scrollTop: h}, 1000)
					dom.newsWrap.html(template.format({news: res.result}))
				}
			})
		} else {
			UIkit.notify("没有了", {timeout: 1500});
		}
	})
})()