
iArr = new Array();
createRefContactsFromCapContactsAndLink(capId, null, iArr, false, false, comparePeopleGenericCOB);
if (appMatch('Planning/Use Permit/Standard/NA') || appMatch('Planning/MOD/Use Permit/Standard') || appMatch('Planning/MOD/Administrative Use Permit/NA') || appMatch('Planning/Landmarks/Signs/NA') || appMatch('Planning/Landmarks/SAP/NA') || appMatch('Planning/Administrative Use Permit/NA/NA')) {

	//start replaced branch: EMSE:PLN_ZONINGAPPLICATIONINFO_Defaults
	{
		editAppSpecific('IsAllZoningPermit', 'Y');
		editAppSpecific('IsVariance', 'N');
		editAppSpecific('IsConstructDemoProject', 'N');
		editAppSpecific('IsNewBuilding', 'N');
		editAppSpecific('IsGradingPlan', 'N');
		editAppSpecific('IsParkingWaiver', 'N');
		editAppSpecific('IsLargeScaleDevProject', 'N');
		editAppSpecific('IsNewBuildingHDistrict', 'N');
		editAppSpecific('IsNewBuildingAdjRes', 'N');
		editAppSpecific('IsNewMainBuilding', 'N');
		editAppSpecific('IsFivePlusUnits', 'N');
		editAppSpecific('IsDensityBonusRequest', 'N');
		editAppSpecific('IsConcessionIncentiveRequest', 'N');
		editAppSpecific('IsTenPlusDwelling', 'N');
		editAppSpecific('IsOneAcreImperviousSurface', 'N');
		editAppSpecific('IsNewBuildingTenThouSqft', 'N');
		editAppSpecific('IsNewDwellingUnit', 'N');
		editAppSpecific('IsNonResProjectTenThouSqft', 'N');
		editAppSpecific('IsIrrigationTwentyFiveThouSqft', 'N');
		editAppSpecific('IsDemoFiftyPercent', 'N');
		editAppSpecific('IsDemoStructureFortyYearOld', 'N');
		editAppSpecific('IsFederalFunding', 'N');
		editAppSpecific('IschangeOfUse', 'N');
		editAppSpecific('IsDwellingElimination', 'N');
		editAppSpecific('IsCoastLiveOak', 'N');
		editAppSpecific('IsEMA', 'N');
		editAppSpecific('IsTenThouSqftImperviousArea', 'N');
		editAppSpecific('IsHazardZone', 'N');
		editAppSpecific('IsCreekBuffer', 'N');

	}
	//end replaced branch: EMSE:PLN_ZONINGAPPLICATIONINFO_Defaults;
}
assignCap(lookup('LOOKUP:PlanningAssignedUser', appTypeArray[1]));

//start replaced branch: EMSE:PLN_DESIGN_REVIEW_FEES
{
	designReview = '';
	feeCode = '';
	if (appMatch('Planning/Design Review/Committee/Preliminary')) {
		designReview = 'DRCP';
	}
	if (appMatch('Planning/Design Review/Committee/Final')) {
		designReview = 'DRCF';
	}
	if (appMatch('Planning/Design Review/Staff Level/NA')) {
		designReview = 'DRSL';
	}
	if (appMatch('Planning/Design Review/Signs/NA')) {
		designReview = 'DRSA';
	}
	if (AInfo['EstConstructCost'] < 50000 && designReview == 'DRCF') {
		feeCode = 'DRCL050';
	}
	if (AInfo['EstConstructCost'] > 50000 && AInfo['EstConstructCost'] < 150000 && designReview == 'DRCF') {
		feeCode = 'DRCL060';
	}
	if (AInfo['EstConstructCost'] > 150000 && designReview == 'DRCF') {
		feeCode = 'DRCL070';
	}
	if (AInfo['EstConstructCost'] < 50000 && designReview == 'DRCP') {
		feeCode = 'DRCL010';
	}
	if (AInfo['EstConstructCost'] > 50000 && AInfo['EstConstructCost'] < 2000000 && designReview == 'DRCP') {
		feeCode = 'DRCL010';
	}
	if (AInfo['EstConstructCost'] > 2000000 && designReview == 'DRCP') {
		feeCode = 'DRCL030';
		showMessage = true;
		comment('Estimated Construction Cost is greater than $2,000,000 and will require a deposit of $4,523');
	}
	if (designReview == 'DRSA') {
		feeCode = 'DRSL010';
	}
	if (AInfo['EstConstructCost'] < 50000 && designReview == 'DRSL') {
		feeCode = 'DRSL020';
	}
	if (AInfo['EstConstructCost'] > 50000 && AInfo['EstConstructCost'] < 2000000 && designReview == 'DRSL') {
		feeCode = 'DRSL030';
	}
	if (AInfo['EstConstructCost'] > 2000000 && designReview == 'DRSL') {
		feeCode = 'DRSL040';
	}
	if ((designReview == 'DRSA' || designReview == 'DRSL')) {
		addFee(feeCode, 'PLN_DRSL', 'FINAL', 1, 'N');
	}
	if ((designReview == 'DRCF' || designReview == 'DRCP')) {
		addFee(feeCode, 'PLN_DRCL', 'FINAL', 1, 'N');
	}

}
//end replaced branch: EMSE:PLN_DESIGN_REVIEW_FEES;
if (appMatch('Planning/Zoning Certificate/*/*')) {
	closeTask('Completeness Review', 'Complete', 'Closed', '');
}
if (appMatch('Planning/Zoning Permit/NA/NA')) {

	//replaced branch(EMSE:UPDATE_SHORTNOTES)
	uPDATE_SHORTNOTES();
}
