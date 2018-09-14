function issueBusinessLicense() {

	newLic = null;
	newLicId = null;
	newLicIdString = null;
	newLicenseType = 'Business';
	monthsToInitialExpire = 12;
	newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], 'License', capName);
	// create the license record;
	if (newLicId) {
		newLicIdString = newLicId.getCustomID();
		updateAppStatus('Active', 'Originally Issued', newLicId);
		editAppName(capName, newLicId);
		recWD = workDescGet(capId);
		copyOwner(capId, newLicId);
		aa.cap.copyCapWorkDesInfo(capId, newLicId);
		holdId = capId;
		capId = newLicId;
		copyParcelGisObjects();
		capId = holdId;
		var ignore = lookup('EMSE:ASI Copy Exceptions', 'License/*/*/*');
		var ignoreArr = new Array();
		if (ignore != null)
			ignoreArr = ignore.split('|');
		copyAppSpecific(newLicId, ignoreArr);
	}
	if (newLicIdString) {
		createRefLicProf(newLicIdString, newLicenseType, 'Business Owner');
		newLic = getRefLicenseProf(newLicIdString);
	}
	if (newLic) {
		newLic.setAuditStatus('A');
		// enable the LP;
		newLic.setBusinessName(AInfo['Doing Business As (DBA) Name']);
		// set LP name to ASI Field;
		aa.licenseScript.editRefLicenseProf(newLic);
	}
	tmpNewDate = dateAddMonths(null, monthsToInitialExpire);
	if (newLic) {
		thisLic = new licenseObject(newLicIdString, newLicId);
		thisLic.setStatus('Active');
	}
	if (newLic) {
		conToChange = null;
		cons = aa.people.getCapContactByCapID(newLicId).getOutput();
		for (thisCon in cons)
			if (cons[thisCon].getCapContactModel().getPeople().getContactType() == 'Applicant')
				conToChange = cons[thisCon].getCapContactModel();
	} else {
		conToChange = null;
	}
	if (conToChange) {
		p = conToChange.getPeople();
		p.setContactType('Business Owner');
		conToChange.setPeople(p);
		aa.people.editCapContact(conToChange);
	}

}
