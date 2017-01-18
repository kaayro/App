var app = {
	tickets: null,
	init:function(){
		$('a').click(app.link);
		$('a#ticket-take').click(app.takeTicket);
		$('a#goTickets').click(app.showTickets);
		$('a#ticket-next').click(app.nextTicket);
		$('a#ticket-back').click(app.backTicket);
	},
	link:function(){
		var id = $(this).attr('href');
		if(id == '#') return false;
	},
	takeTicket:function(){
		alert('función aún no disponible');
	},
	showTickets:function(){
		//Obtener tickets mediante ajax
		app.tickets = tickets;
		var promo = $('#tickets section .header h3');
		var image = $('#tickets section .logo img');
		var take = $('#ticket-take');
		
		$('#tickets').data('array',0);
		promo.text(app.tickets[0].promo);
		image.attr('src',app.tickets[0].img);
		take.attr('data',app.tickets[0].id);
		
	},
	nextTicket:function(){
		//Obtener tickets mediante ajax
		var arr = parseInt($('#tickets').data('array'));
		
		if(arr < app.tickets.length-1){
			var promo = $('#tickets section .header h3');
			var image = $('#tickets section .logo img');
			var take = $('#ticket-take');

			$('#tickets').data('array',arr+1);
			promo.text(app.tickets[arr+1].promo);
			image.attr('src',app.tickets[arr+1].img);
			take.attr('data',app.tickets[arr+1].id);
		}
	},
	backTicket:function(){
		//Obtener tickets mediante ajax
		var arr = parseInt($('#tickets').data('array'));
		
		if(arr > 0){
			var promo = $('#tickets section .header h3');
			var image = $('#tickets section .logo img');
			var take = $('#ticket-take');

			$('#tickets').data('array',arr-1);
			promo.text(app.tickets[arr-1].promo);
			image.attr('src',app.tickets[arr-1].img);
			take.attr('data',app.tickets[arr-1].id);
		}
	}
};
$(app.init);

var tickets = [
	{id: '1',promo: 'Clase Gratis',img: 'img/promo01.JPG'},
	{id: '2',promo: '-20% en Mojito',img: 'img/promo02.jpg'},
	{id: '3',promo: '2 x 1 en Tequila',img: 'img/promo03.png'},
	{id: '4',promo: '-10% en Ascenso a Media Montaña',img: 'img/promo04.png'},
	{id: '5',promo: '1 Café Gratis',img: 'img/promo05.jpg'}
];