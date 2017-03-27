app.login = {
	init: function(){
		if(app.login.userLogged())
			app.login.userAccess();
		$(document).on('submit','form#login',app.login.validatingUser);
	},
	validatingUser: function(e){
		e.preventDefault();
		var mail = $(this).find('input').eq(0).val();
		var pass = $(this).find('input').eq(1).val();
		
		$('section#loading').show();
		
		$.post(app.server+'user.php',{action:'validateUser',mail:mail,pass:pass},app.login.validatedUser);
	},
	validatedUser: function(data){
		if(data != 'null'){
			data = JSON.parse(data);
			window.localStorage.setItem('user',data.id);
			window.localStorage.setItem('userName',data.name);
			app.login.userAccess();
		}else{
			alert('Correo Electrónico o Contraseña incorrectos, intenta de nuevo.');//'Correo Electrónico o Contraseña incorrectos, intenta de nuevo.','Error de autentificación',null,'Aceptar'
			$('section#loading').hide();
		}
	},
	userAccess: function(){
		$('section#loading').show();
		app.user = {id:window.localStorage.getItem('user'),name:window.localStorage.getItem('userName')};
		//llenar la página de profile y poner un loder hasta que llene
		var profile = $('section#profile');
		profile.find('.actions h4 span').text(app.user.name);
		profile.find('article img').attr('src','http://tourindigital.com/app/imgs/'+app.user.id+'.jpg');
		profile.find('article img')[0].addEventListener('load',function(){
			app.animations.transition('#profile','quitLeft');
			$('section#loading').hide();
		});
	},
	userLogged: function(){
		if(window.localStorage.getItem('user') != undefined) return true;
		else return false;
	}
};
app.ready(app.login.init);