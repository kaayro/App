var app = {
	server: 'http://localhost/iGitWeb/TourInDigital/Server/app/',
	user: null,
	history: [],
	ready: function(fnc){
		$(function(){
			//document.addEventListener('deviceready',fnc,false);
			window.addEventListener('load',fnc,false);
		});
	},
	init: function(){
		//alert();
	}
	
};
app.ready(app.init);