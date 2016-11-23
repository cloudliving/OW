;(function(){
	var _body = $('body')
	var vm = new Vue({
		el: '#app',
		data: {
			newList: [],
			typeList: [],
			curType: 0,
			curPage: 1,
			allPage: 0,
			typeUrl: 'http://www.cloudliving.net/official_website.php?c=Index&a=news&action=type_list',
			statisUrl: 'http://tw.cloudliving.net/official_website.php?c=Index&a=news&action=news_click_num_plus_one'
		},
		methods: {
			toggleType: function (e) {
				var target = $(e.target)
				target.addClass('active').siblings().removeClass('active')
				this.curType = target.attr('data-type')
				this.curPage = 1
				this.load()
			},
			prev: function(){
				this.curPage > 1 ? 
				this.curPage-- && this.load() :
				UIkit.notify('没有了', {timeout: 1500})

			},
			next: function() {
				this.curPage < this.allPage ? 
				this.curPage++ && this.load() :
				UIkit.notify('没有了', {timeout: 1500})
			},
			load: function () {
				let that = this
				$.get(that.newUrl, function(r) {
					that.newList = r.result
					that.allPage = r.page_count
					_body.animate({scrollTop: that.h}, 1000)
				}, 'json')
			},
			statis: function (id) {
				$.get(this.statisUrl, {nid: id})
			}
		},
		computed: {
			newUrl: function(){
				return 'http://www.cloudliving.net/official_website.php?c=Index&a=news&action=news_list&page='+this.curPage+'&type='+this.curType
			},
			h: function () {
				this.typeList
				return $('.tags').offset().top
			}
		},
		created: function(){
			var that = this
			$.get(that.typeUrl, function(r){
				that.typeList = r.result
				that.load()
			}, 'json')
		}
	})

})()