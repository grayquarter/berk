
showDebug = false;

//start replaced branch: EMSE:ACARequireShortTermRentalPerimtAttachment
{
	updateFee('ZC060', 'PLN_ZC', 'FINAL', 1, 'N');
	updateFee('ZC070', 'PLN_ZC', 'FINAL', 1, 'N');
	var plansFound = false;
	var docList = new Array();
	var tmpCapStr = capId.getID1() + '-' + capId.getID2() + '-' + capId.getID3();
	docList = aa.document.getDocumentListByEntity(tmpCapStr, 'TMP_CAP').getOutput().toArray();
	if (docList.length < 4) {
		cancel = true;
		showMessage = true;
		message = '\n Please provide at least 4 supporting documents for your application.\n';
	}

}
//end replaced branch: EMSE:ACARequireShortTermRentalPerimtAttachment;
