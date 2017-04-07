app.tickets.scanner = {
	init: function(){
		$(document).on('click','#ticket footer a.use',app.tickets.scanner.scan);
	},
	scan: function(){
		cordova.plugins.barcodeScanner.scan(
			function (result) {
			  alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);
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
	}
};
app.ready(app.tickets.scanner.init);