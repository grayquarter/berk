
iArr = new Array();
createRefContactsFromCapContactsAndLink(capId, null, iArr, false, false, comparePeopleGenericCOB);
if (publicUser) {
	subType = 'Online';
}
if (!publicUser) {
	subType = null;

	//start replaced branch: EMSE:CSLB_AFTER
	{
		cslbMessage1 = null;
		cslbMessage = 'None';
		existsInCSLB = '-1';
		conLicNum = '';
		showMessage = true;
		comment(' ******* Update Licensed Professional from State website **********');
		theLicNumber = null;
		capLicenseArr = aa.licenseScript.getLicenseProf(capId).getOutput();
		if (capLicenseArr && capLicenseArr.length > 0) {
			theLicNumber = capLicenseArr[0].getLicenseNbr();
			comment('LP Number: ' + theLicNumber);
			conLicNum = getLPConLicNum(theLicNumber);
			comment('CSLB Number: ' + conLicNum);
		} else {
			comment('There are no LPs to update');
		}
		if (conLicNum) {
			conLicNum = conLicNum.toString();
		} else {
			conLicNum = '';
		}
		lpTypeContractor = checkCapForLicensedProfessionalType('Construction or Contractor');
		comment('Contractor = ' + lpTypeContractor);
		if (theLicNumber != null && lpTypeContractor && conLicNum.substr(0, 1) > 0 && conLicNum.substr(0, 6) <= 999999) {
			cslbMessage = externalLP_CA_COB2(theLicNumber, 'Construction or Contractor', true, true, capId);
			comment('CSLB Website response: ' + cslbMessage);
		} else {
			comment('ERROR: CSLB number missing or poorly formatted, website not contacted');
		}
		comment(' ****************************************************************************');
		showMessage = false;
		// turn off messaging;

	}
	//end replaced branch: EMSE:CSLB_AFTER;
}
if (appTypeArray[1] != 'Pre-application' && appTypeArray[1] != 'Online' && appTypeArray[1] != 'Minor') {
	subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
}
if (subType != null) {
	updateShortNotes(subType);
}
if (!publicUser) {
	editAppSpecific('Plan Review Expiration Date', dateAdd(null, 180));
	editAppSpecific('Filing Date', dateAdd(null, 0));
}
if (AInfo['Plan Check Type'] != null && AInfo['Plan Check Type'] != '') {
	editPriority(AInfo['Plan Check Type']);
}
if (appMatch('Building/Permit/NA/NA') && typeof(PHASES) == 'object') {
	var runTable;
	runTable = true;
	var childCreatedCounter = 0;
	updateShortNotes('');
	//editPriority('Phased Project');
}
if (appMatch('Building/Permit/NA/NA') && typeof(PHASES) == 'object') {
	editAppName('Phased Project');
	for (thisRow in PHASES)
		branch('EMSE:B_ProcessPhasesTable');
}

//replaced branch(EMSE:ASIUA_BLD_EDIT CONST TYPE)
aSIUA_BLD_EDIT CONST TYPE();
