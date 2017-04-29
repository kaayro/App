app.tickets = {
	tickets: null,
	i: 0,
	init: function(){
		$(document).on('click','#ticket-options .tour-types a',app.tickets.getTickets);
		$(document).on('click','#nxt-ticket',app.tickets.nextTicket);
		$(document).on('click','#prv-ticket',app.tickets.prevTicket);
        $(document).on('click','#ticket-confirm a.like',app.tickets.confirm);
        $(document).on('click','#ticket-confirm a.deslike',app.tickets.confirm);
	},
	getTickets: function(){
		$('#loading').show();
		
		if(app.history[app.history.length - 1].page == '#ticket')
			app.history.pop();
		
		var data = {
			action: 'getTickets',
			category: $(this).data('cat'),
			location: ''
		};
		$.post(app.server+'tickets.php',data,app.tickets.ticketsRequest);
	},
	ticketsRequest: function(data){
		if(data != 0){
			data = JSON.parse(data);
			if(data.length > 0){
				app.tickets.tickets = data;
                app.tickets.i = 0;
				app.tickets.viewTicket(app.tickets.i,app.tickets.changePage);
			}else{
				alert('No tenemos tickets para esta categoría en esta ciudad, por favor contactanos a info@tourindigital.com');
				$('#loading').hide();
			}
		}else{
			alert('Hubo un error en la base de datos, por favor intenta màs tarde.');
			$('#loadgin').hide();
		}
	},
	viewTicket: function(i,transition){
		$('#loading').show();
		if(i >= 0 && i < app.tickets.tickets.length){
			app.tickets.i = i;
			ticket = app.tickets.tickets[i];
			
			$('#ticket header img').attr('src',app.server+'companies/'+ticket.companyId+'/'+ticket.ticketPicture);//'http://identidadgeek.com/wp-content/uploads/2014/12/mexicana.jpg');
			$('#ticket header img')[0].addEventListener('load',function(){
				$('#name-company h2').text(ticket.companyName);
				$('#ticket .description p').text(ticket.ticketDeal);
				$('#ticket .use').data('id',ticket.ticketId);
				$('#ticket .map').data('location',ticket.ticketLocation).data('address',ticket.ticketAddress);
				if(ticket.ticketCategory == 1){
					$('#ticket .ticket-category i').attr('class','fa-activity');
					$('#ticket .ticket-category p').text('Actividades y Entretenimiento');
				}
				if(ticket.ticketCategory == 2){
					$('#ticket .ticket-category i').attr('class','fa-hotels');
					$('#ticket .ticket-category p').text('Hoteles y Restaurantes');
				}
				if(ticket.ticketCategory == 3){
					$('#ticket .ticket-category i').attr('class','fa-shops');
					$('#ticket .ticket-category p').text('Tiendas y Artesanías');
				}
				transition();
			},false);
		}else
			$('#loading').hide();
	},
	nextTicket: function(){
		app.tickets.viewTicket(app.tickets.i + 1,app.tickets.changePage);
	},
	prevTicket: function(){
		app.tickets.viewTicket(app.tickets.i - 1,app.tickets.changePage);
	},
	changePage: function(){
		$('#loading').hide();
		if($('section.page.active').attr('id') == 'ticket-options')
			app.animations.transition('#ticket','quitUp');
	},
    confirm: function(){
        $('#loading').show();
        var like = 2;
        if($(this).hasClass('like')) like = 1;
        var data = {
            action: 'ticketConfirm',
            user: app.user.id,
            ticket: $('#ticket-confirm .like-promo h3').text(),
            opinion: like
        };
        $.post(app.server+'tickets.php',data,function(msg){
            $('#loading').hide();
            if(msg == 0) alert("Hubo un error al enviar la confirmación, intenta de nuevo.");
            else app.animations.transition('#profile','quitRight');
        });
    }
};
app.ready(app.tickets.init);