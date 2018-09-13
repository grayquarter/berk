
var isvalidZone = false;
isvalidZone = getZone();
if (isvalidZone == false) {
	cancel = true;
	showMessage = true;
	message = tempError;
}
