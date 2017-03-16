var ticketsopts = {
	init: function(){
		//alert();
	},
	map: null,
	marker: null,
	drawMap: function(){
		if(ticketsopts.marker != null)
			ticketsopts.marker.setMap(null);
		loc = $('#ticket-location').attr('data');
		loc = loc.split(',');
		var myLatlng = new google.maps.LatLng(loc[0],loc[1]);
		if(ticketsopts.map == null){
			var noPoi = [{
				featureType: "poi",
				stylers: [{ visibility: "off" }]   
			}];
			var mapOptions = {
				zoom: 15,
		  		center: myLatlng,
				disableDefaultUI: true,
				zoomControl: true,
				styles: noPoi
			}
			ticketsopts.map = new google.maps.Map(document.getElementById("ticketMap"), mapOptions);
		}else{
			ticketsopts.map.setCenter(myLatlng);
		}

		ticketsopts.marker = new google.maps.Marker({
			position: myLatlng,
			title:"Hello World!"
		});

		// To add the marker to the map, call setMap();
		ticketsopts.marker.setMap(ticketsopts.map);
		
		alert();
		// Ir a la página de mapas
		$('.page').hide();
		$('#tickets-maps').show();
	}
};