var app = {
	//server: 'http://localhost/iGitWeb/TourInDigital/Server/app/',
	server: 'http://tourindigital.com/app/',
	user: null,
	history: [],
	ready: function(fnc){
		$(function(){
			document.addEventListener('deviceready',fnc,false);
			//window.addEventListener('load',fnc,false);
		});
	},
	init: function(){
		$(document).on('click','a',app.link);
        $(document).on('click','a#session-close',app.sessionClose);
	},
	link: function(e){
		e.preventDefault();
		if($(this).data('rel') == 'back'){
			app.linkBack();
		}else{
			var href = $(this).attr('href');
			var animation = $(this).data('transition');
			var currentPage = $('section.page.active').attr('id');

			if(href != '' && href != undefined && href != '#' && $(href).length > 0){
				app.history.push({page:'#'+currentPage,transition:animation});
				app.animations.transition(href,animation);
			}
		}
	},
	linkBack: function(){
		var last = app.history.length - 1;
		var page = app.history[last].page;
		var anim = app.history[last].transition;
		
		if(anim == undefined) anim = 'fade';
		
		app.animations.transition(page,app.animations.transitionReverse(anim));
		app.history.pop();
	},
	sessionClose: function(){
        window.localStorage.clear();
        app.animations.transition('#login','putRight')
    }
};
app.ready(app.init);