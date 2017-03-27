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
		
		if(animation == undefined) animation = 'fade';
		
		nextPage.addClass('preactive ' + animation);
		currentPage.addClass(animation);
	},
	endTransition: function(){
		var currentPage = $('section.active');
		var nextPage = $('section.preactive');
		currentPage.attr('class','').addClass('page');
		nextPage.attr('class','').addClass('page active');
	},
	transitionReverse: function(animation){
		var result = '';
		switch(animation){
			case 'fade':result='fade';break;
			case 'quitLeft':result='putRight';break;
			case 'quitRight':result='putLeft';break;
			case 'quitUp':result='putDown';break;
			case 'quitDown':result='putUp';break;
			case 'putLeft':result='quitRight';break;
			case 'putRight':result='quitLeft';break;
			case 'putUp':result='quitDown';break;
			case 'putDown':result='quitUp';break;
		}
		
		return result;
	}
};
app.ready(app.animations.init);