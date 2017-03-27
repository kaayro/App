app.animations = {
	init: function(){
		$('section.page').each(function(){
			var nextPage = $(this);
			nextPage[0].addEventListener("webkitAnimationEnd", app.animations.endTransition);
			nextPage[0].addEventListener("animationend", app.animations.endTransition);
		});
	},
	transition: function(page,animation){
		var currentPage = $('section.page.active');
		var nextPage = $(page);
		nextPage.addClass('preactive ' + animation);
		currentPage.addClass(animation);
	},
	endTransition: function(){
		var currentPage = $('section.active');
		var nextPage = $('section.preactive');
		currentPage.attr('class','').addClass('page');
		nextPage.attr('class','').addClass('page active');
	}
};
app.ready(app.animations.init);