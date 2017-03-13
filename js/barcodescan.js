var qrscanner = {
	scan: function(){
		alert(1);
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
			  "preferFrontCamera" : true,
			  "showFlipCameraButton" : true,
			  "prompt" : "Place a barcode inside the scan area",
			  "formats" : "QR_CODE,PDF_417", 
			  "orientation" : "landscape"
			}
		);
	}
};