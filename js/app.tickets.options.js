var ticketsopts = {
	init: function(){
		//alert();
	},
	map: null,
	drawMap: function(){
		
		var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
		if(ticketsopts.map == null){
			var mapOptions = {
				zoom: 4,
		  		center: myLatlng
			}
			ticketsopts.map = new google.maps.Map(document.getElementById("ticketMap"), mapOptions);
		}else{
			ticketsopts.map.setCenter(myLatlng);
		}

		var marker = new google.maps.Marker({
			position: myLatlng,
			title:"Hello World!"
		});

		// To add the marker to the map, call setMap();
		marker.setMap(map);
	}
};