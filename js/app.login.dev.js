app.login = {
	init: function(){
		if(app.login.userLogged())
			app.login.userAccess();
		$(document).on('submit','form#login',app.login.validatingUser);
		$(document).on('submit','form#register-form',app.login.sendRegisterData);
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
			window.localStorage.setItem('userImg',data.img);
			app.login.userAccess();
		}else{
			alert('Correo Electrónico o Contraseña incorrectos, intenta de nuevo.');//'Correo Electrónico o Contraseña incorrectos, intenta de nuevo.','Error de autentificación',null,'Aceptar'
			$('section#loading').hide();
		}
	},
	userAccess: function(){
		$('section#loading').show();
		app.user = {id:window.localStorage.getItem('user'),name:window.localStorage.getItem('userName'),img:window.localStorage.getItem('userImg')};
		//llenar la página de profile y poner un loder hasta que llene
		var profile = $('section#profile');
		profile.find('.actions h4 span').text(app.user.name);
		var img = app.user.id;
		if(app.user.img == '0') img = 'default';
		profile.find('article img').attr('src','http://tourindigital.com/app/imgs/'+img+'.jpg');
		profile.find('article img')[0].addEventListener('load',function(){
			app.animations.transition('#profile','quitLeft');
			$('section#loading').hide();
		});
	},
	userLogged: function(){
		if(window.localStorage.getItem('user') != undefined) return true;
		else return false;
	},
	sendRegisterData: function(e){
		e.preventDefault();
		
		$('section#loading').show();
		var form = $(this);
        var bdate = $('div#bdate');
		var data = {
			action: 'userRegister',
			name: form.find('input').eq(0).val(),
			lastname: form.find('input').eq(1).val(),
			sex: form.find('select').eq(0).val(),
			mail: form.find('input').eq(2).val(),
			pass: form.find('input').eq(3).val(),
			bdate: bdate.find('.year').val()+'-'+bdate.find('.month').val()+'-'+bdate.find('.day').val(),
			country: form.find('select').eq(1).val(),
			location: 'latitud y longitud'
		}
		$.post(app.server+'user.php',data,app.login.registerDataResponse);
	},
	registerDataResponse: function(data){
		if(data != '0' && data != 'null'){
			data = JSON.parse(data);
			window.localStorage.setItem('user',data.id);
			window.localStorage.setItem('userName',data.name);
			window.localStorage.setItem('userImg',data.img);
			app.login.userAccess();
		}else{
			alert('Hubo un error al crear tu cuenta, intenta de nuevo.');//'Hubo un error al crear tu cuenta, intenta de nuevo.','Error de registro',null,'Aceptar'
			$('section#loading').hide();
		}
	}
};
app.ready(app.login.init);