app.tickets.scanner = {
	init: function(){
		$(document).on('click','#ticket footer a.use',app.tickets.scanner.scan);
	},
	scan: function(){
		$('#loading').show();
		cordova.plugins.barcodeScanner.scan(
			function (result) {
                if(!result.cancelled){
                    var arr = result.text.split('?');
                    var data = {
                        action: 'getTicketCode',
                        table: arr[arr.length - 1],
                        user: app.user.id,
                        ticket: $('#ticket footer a.use').data('id'),
                    };
				    $.post(app.server+'tickets.php',data,app.tickets.scanner.getTicketCode);
                }else $('#loading').hide();
			},
			function (error) {
			  alert("Scanning failed: " + error);
			},
			{
				preferFrontCamera : false, // iOS and Android 
				showFlipCameraButton : false, // iOS and Android 
				showTorchButton : false, // iOS and Android 
				torchOn: false, // Android, launch with the torch switched on (if available) 
				prompt : "Escanea el código qr para obtener la promoción", // Android 
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
				formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
				orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device 
				disableAnimations : true, // iOS 
				disableSuccessBeep: false // iOS 
			}
		);
	},
	getTicketCode: function(data){
		if(data != '0'){
            var place = $('#name-company').text();
            var description = $('#ticket .description').text();
            var code = data;
            $('#ticket-confirm header h4').text(place);
            $('#ticket-confirm .like-promo p').text(description);
            $('#ticket-confirm .like-promo h3').text(code);
            $('#loading').hide();
            app.animations.transition('#ticket-confirm','putLeft');
        }else{
            alert("Error al escanear el código, intenta de nuevo");
            $('#loading').hide();
        }
	}
};
app.ready(app.tickets.scanner.init);