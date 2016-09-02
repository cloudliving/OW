;(function(){
	var dom = {wrap: $('.article')},
		url = {
			article: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_detail',
			stat: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_browse_num_plus_one'
		},
		template = '<div class="hd uk-text-center">'+
						'<p class="title">{#news_title#}</p>'+
						'<p class="date">{#create_time#}</p>'+
					'</div>'+
					'<div class="ctn">{#news_content#}</div>'

		nid = utils.parseSearch().id,


	// 访问统计
	$.get(url.stat, {nid: nid})

	$.get(url.article, {nid: nid}, function(res){
		if (res.Code == 0) {
			console.log(template.format(res.result))
			dom.wrap.append(template.format(res.result))

			$('.ctn img').each(function(index, el){
				$(this).parents('p').css('text-indent', 0)
			})
		}
	}, 'json')
})()