
if (true) {
	zchoQuestions = '';
	assignCap(lookup('LOOKUP:PlanningAssignedUser', appTypeArray[1]));
}
if (cap.isCreatedByACA()) {
	isresident = getAppSpecific('isresident', capId);
	isbusinessInvolveStorage = getAppSpecific('isbusinessInvolveStorage', capId);
	comment(isbusinessInvolveStorage);
	comment(isbusinessInvolveStorage);
}
if (cap.isCreatedByACA()) {
	islegalUnit = getAppSpecific('islegalUnit', capId);
	comment(islegalUnit);
}
if (cap.isCreatedByACA()) {
	isbusinessInvolveCustomerVisit = getAppSpecific('isbusinessInvolveCustomerVisit', capId);
	comment(isbusinessInvolveCustomerVisit);
}
if (cap.isCreatedByACA()) {
	isbusinessEmployee = getAppSpecific('isbusinessEmployee', capId);
	comment(isbusinessEmployee);
}
if (cap.isCreatedByACA()) {
	isbusinessInvolveAutoTrips = getAppSpecific('isbusinessInvolveAutoTrips', capId);
	comment(isbusinessInvolveAutoTrips);
}
if (cap.isCreatedByACA()) {
	isbusinessActivitiesInDwelling = getAppSpecific('isbusinessActivitiesInDwelling', capId);
	comment(isbusinessActivitiesInDwelling);
}
if (cap.isCreatedByACA()) {
	isbusinessOccupyLessThanTwentyPercent = getAppSpecific('isbusinessOccupyLessThanTwentyPercent', capId);
	comment(isbusinessOccupyLessThanTwentyPercent);
}
if (cap.isCreatedByACA()) {
	isbusinessActivities = getAppSpecific('isbusinessActivities', capId);
	comment(isbusinessActivities);
}
if (cap.isCreatedByACA()) {
	isbusinessInvolveHazMat = getAppSpecific('isbusinessInvolveHazMat', capId);
	comment(isbusinessInvolveHazMat);
}
if (cap.isCreatedByACA()) {
	isbusinessCreateOffensiveNoise = getAppSpecific('isbusinessCreateOffensiveNoise', capId);
	comment(isbusinessCreateOffensiveNoise);
}
if (isresident.equals('Yes') && islegalUnit.equals('Yes') && isbusinessInvolveStorage.equals('Yes') && isbusinessInvolveCustomerVisit.equals('No') && isbusinessInvolveAutoTrips.equals('No') && isbusinessEmployee.equals('No') && isbusinessActivitiesInDwelling.equals('Yes') && isbusinessOccupyLessThanTwentyPercent.equals('Yes') && isbusinessActivities.equals('No') && isbusinessInvolveHazMat.equals('No') && isbusinessCreateOffensiveNoise.equals('No')) {
	zchoQuestions = 'No';
} else {
	zchoQuestions = 'Yes';
}

//start replaced branch: EMSE:ZC_GIS_ACA
{
	myArr = new Array();
	if (proximity('AGIS_BERKELEY', 'Zoning Districts', -2, 'feet')) {
		var myArr = getGISInfoArray2('AGIS_BERKELEY', 'Zoning Districts', 'ZONDIST', -3, 'feet');
		logDebug('myArr has ' + myArr.length + ' items');
	}
	if (myArr[0]) {
		editAppSpecific('zoningDistrict', myArr[0]);
	}
	if (myArr[1] != null) {
		editAppSpecific('zoningDistrict', myArr[0] + ',' + myArr[1]);
	}
	if (myArr[2] != null) {
		editAppSpecific('zoningDistrict', myArr[0] + ',' + myArr[1] + ',' + myArr[2]);
	}

}
//end replaced branch: EMSE:ZC_GIS_ACA;
if (zchoQuestions == 'No' && AInfo['zoningDistrict'] != 'ES-R' && AInfo['businessName'] != null) {

	//start replaced branch: EMSE:PLN_ZC_FEES
	{
		zc = '';
		feeCode = '';
		if (appMatch('Planning/Zoning Certificate/Building Permit/*')) {
			zc = 'bp';
		}
		if (appMatch('Planning/Zoning Certificate/Low Impact Home Occupation/*')) {
			zc = 'liho';
		}
		if (appMatch('Planning/Zoning Certificate/Accessory Dwelling Units/*')) {
			zc = 'adu';
		}
		if (appMatch('Planning/Zoning Certificate/Business License/*')) {
			zc = 'bl';
		}
		if (appMatch('Planning/Zoning Certificate/Permit Transfer/*')) {
			zc = 'pt';
		}
		if (zc == 'bp') {
			feeCode = 'ZC020';
		}
		if (zc == 'liho') {
			feeCode = 'ZC010';
		}
		if (zc == 'adu') {
			feeCode = 'ZC020';
		}
		if (zc == 'bl') {
			feeCode = 'ZC040';
		}
		if (zc == 'pt') {
			feeCode = 'ZC060';
		}
		if ((zc == 'bp' || zc == 'liho' || zc == 'adu' || zc == 'pt')) {
			updateFee(feeCode, 'PLN_ZC', 'FINAL', 1, 'N');
		}

	}
	//end replaced branch: EMSE:PLN_ZC_FEES;
}
