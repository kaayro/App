var app = {
	tickets: null,
	ready: function(){
		document.addEventListener('deviceready',app.ready,false);
	},
	init:function(){
		$('a').click(app.link);
		$('a#ticket-take').click(qrscanner.scan);
		$('a#goTickets').click(app.showTickets);
		$('a#ticket-next').click(app.nextTicket);
		$('a#ticket-back').click(app.backTicket);
		$('#home').show();
		
		//select a tour
		$('div.tour-opt').click(app.selectTour);
		
		//select a ticket
		//$(document).on('click','#ticket-take',qrscanner.scan);
	},
	link:function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		if(id != '#'){
			$('.page').hide();
			$(id).show();
		}
	},
	takeTicket:function(){
		alert('función aún no disponible');
	},
	showTickets:function(){
		//Obtener tickets mediante ajax
		app.drawTickets(0);
	},
	nextTicket:function(){
		//Obtener tickets mediante ajax
		var arr = parseInt($('#tickets').data('array'));
		
		if(arr < app.tickets.length-1){
			app.drawTickets(arr + 1);
		}
	},
	drawTickets:function(i){
		app.tickets = tickets;
		var image = $('#tickets section .logo img');
		var categoryName = $('#tickets section .category span');
		var categoryIcon = $('#tickets section .category i');
		var company = $('#tickets section .company h5');
		var address = $('#tickets section .company h6');
		var promo = $('#tickets section .description p');
		var take = $('#ticket-take');
		var map = $('#ticket-location');
		
		$('#tickets').data('array',i);
		image.attr('src',app.tickets[i].img);
		var catName = 'Actividades y Entretenimiento';
		var catIcon = 'bicycle';
		if(app.tickets[i].category == 2){
			catName = 'Hoteles y Restaurantes';
			catIcon = 'bed';
		}
		if(app.tickets[i].category == 3){
			catName = 'Artesanías y<br>Tiendas';
			catIcon = 'shopping-basket';
		}
		categoryName.html(catName);
		categoryIcon.attr('class','fa fa-'+catIcon);
		company.text(app.tickets[i].company);
		address.text(app.tickets[i].address);
		promo.text(app.tickets[i].promo);
		take.attr('data',app.tickets[i].id);
		map.attr('data',app.tickets[i].location);
	},
	backTicket:function(){
		//Obtener tickets mediante ajax
		var arr = parseInt($('#tickets').data('array'));
		
		if(arr > 0){
			app.drawTickets(arr - 1);
		}
	},
	selectTour:function(){
		var tour = $(this).data('role');
		$('.page').hide();
		$('#touriners-profiles').show();
	},
};
$(app.ready);

var tickets = [
	{id: '1',promo: 'Obtén una clase grátis en horario de 07:00pm a 09:00pm el día jueves. Este ticket es válido una sola vez por usuario de la aplicación.',address: 'Calle 7 Norte No. 8, Centro Histórico',img: 'img/promo01.JPG',location:'19.047283,-98.202763',category:'1',company:'Asere & Co.'},
	{id: '2',promo: 'Te damos un 20% de descuento en un Mojito el día que vengas con nosotros. Este ticket es válido una sola vez por usuario de la aplicación',address: 'Calle 7 Norte No. 8, Centro Histórico',img: 'img/promo02.png',location: '19.047283,-98.202763',category:'2',company:'El Breve Espacio'},
	{id: '3',promo: 'Pide 2 Tequilas y paga sólo uno cualquier día de la semana. Este ticket es válido una sola vez por usuario de la aplicación',address: 'Av 5 Poniente 313 local A., Centro Histórico',img: 'img/promo03.png',location:'19.0437155,-98.2020955',category:'2',company:'Las Brisas'},
	{id: '4',promo: '-10% en Ascenso a Media Montaña',address: 'Calle 5 Norte No. 407, Centro Histórico',img: 'img/promo04.png',location:'19.048089,-98.2004769',category:'1',company:'Aukyani México'},
	{id: '5',promo: '1 Café Gratis',address: 'Av 5 Pte 322, Centro Histórico',img: 'img/promo05.jpg',location:'19.0440883,-98.2022488',category:'2',company:'Fonda Margarita'},
	{id: '6',promo: '1 Café Gratis',address: 'Av 5 Pte 322, Centro Histórico',img: 'img/promo06.jpg',location:'19.0440883,-98.2022488',category:'1',company:'Museo de Miniaturas'},
	{id: '7',promo: '1 Café Gratis',address: 'Av 5 Pte 322, Centro Histórico',img: 'img/promo07.jpg',location:'19.0440883,-98.2022488',category:'3',company:'Arte Mexicano Colibrí'},
	{id: '8',promo: '1 Café Gratis',address: 'Calle 6 Nte 408, Centro Histórico',img: 'img/promo08.jpg',location:'19.0440089,-98.1929967',category:'1',company:'Museo de Talavera Poblana Armando'},
	{id: '9',promo: '1 Café Gratis',address: 'Calle 6 Nte 408, Centro Histórico',img: 'img/promo09.jpg',location:'19.0440089,-98.1929967',category:'2',company:'La Cafetería - Grupo Armando'},
	{id: '10',promo: '1 Café Gratis',address: 'Calle 6 Nte 408, Centro Histórico',img: 'img/promo10.jpg',location:'19.0440089,-98.1929967',category:'3',company:'Talavera - Grupo Armando'}
];