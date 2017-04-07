app.tickets.map = {
	map: null,
	marker: null,
	init: function(){
		$(document).on('click','#ticket footer .map',app.tickets.map.showMap);
	},
	showMap: function(){
		$('#loading').show();
		if(app.tickets.map.marker != null)
			app.tickets.map.marker.setMap(null);
		
		var address = $(this).data('address');
		var location = $(this).data('location');
		location = location.split(',');
		
		$('#ticket-map header h4').text(address);
		var myLatlng = new google.maps.LatLng(location[0],location[1]);
		if(app.tickets.map.map == null){
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
			app.tickets.map.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		}else{
			app.tickets.map.map.setCenter(myLatlng);
		}

		app.tickets.map.marker = new google.maps.Marker({
			position: myLatlng
		});

		// To add the marker to the map, call setMap();
		app.tickets.map.marker.setMap(app.tickets.map.map);
		app.history.push({page:'#ticket',transition:'putUp'});
		$('#loading').hide();
		app.animations.transition('#ticket-map','putUp');
	}
};
app.ready(app.tickets.map.init);