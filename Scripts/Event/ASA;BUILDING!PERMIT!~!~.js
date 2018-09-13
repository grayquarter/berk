
if (estValue != AInfo['Job Valuation']) {
	updateValFlag = true;
	comment('asa Job Value = ' + estValue);
} else {
	updateValFlag = false;
}
aa.finance.reCalculateFees(capId, 'CONT', AInfo['Job Valuation']);
newTblArray = new Array();
newRowArray = new Array();
strValuation = '';
if (String(getAppSpecific('Job Valuation')) == 'null')
	strValuation = '0';
else
	strValuation = String(getAppSpecific('Job Valuation'));
newRowArray['Valuation'] = String(strValuation);
newRowArray['Date'] = dateAdd(null, 0);
newRowArray['Updated By'] = String(currentUserID);
if (typeof(VALUATIONHISTORY) != 'object') {
	newTblArray.push(newRowArray);
	addASITable('VALUATION HISTORY', newTblArray);
}
if (typeof(VALUATIONHISTORY) == 'object') {
	addToASITable('VALUATION HISTORY', newRowArray);
}
varLookupTable = 'Building Permit Fees';
subType = AInfo['Category'] + '|' + AInfo['Work Type'];
varFeeSched = 'B_BLDG';
varLkupCrit = 'Standard';
if (appMatch('Building/Permit/NA/NA')) {
	varLkupCrit = 'Standard';
	//phased children have this type;
}
if (appMatch('Building/Revision or Deferred/NA/NA')) {
	varLkupCrit = 'Revision';
}
if (appMatch('Building/Subsequent Phase/NA/NA')) {
	varLkupCrit = 'Phase';
}
if (subType != null) {
	varLkupCrit = varLkupCrit + '|' + subType;
	comment('Lookup Criteria = ' + varLkupCrit);
}
if (!publicUser && varLkupCrit.indexOf('/') > -1) {
	varLkupCrit = 'Standard|Commercial|Alteration';
}
if (!publicUser && lookup(varLookupTable, varLkupCrit) != null) {
	varSpecialFees = '';
	varSpecialFees = lookup(varLookupTable, varLkupCrit);
	specFeeCodes = new Array();
	specFeeCodes = varSpecialFees.split(',');
}
if (AInfo['Building'] == 'Yes' && !publicUser && lookup(varLookupTable, varLkupCrit) != null) {
	for (thisCode in specFeeCodes)
		//replaced branch(EMSE:FLAG_FEES_SCHEDULES)
		fLAG_FEES_SCHEDULES();
}
if (AInfo['Plan Check Type'] == 'Accelerated') {
	updateFee('F250', varFeeSched, 'Final', 1, 'N');
}

//replaced branch(EMSE:SET_AppName)
sET_AppName();
//
//replaced branch(EMSE:GET_PCHK_DAYS)
gET_PCHK_DAYS();
if (matches(AInfo['Work Type'], 'Demolition', 'Sign', 'Solar', 'Structure Move', 'Electrical Vehicle Charging')) {
	editAppName(AInfo['Work Type'] + ' Permit');
}
if (AInfo['Electrical'] == 'Yes') {

	//replaced branch(EMSE:ADD_ELEC_FEES)
	aDD_ELEC_FEES();
}
if (AInfo['Mechanical'] == 'Yes') {

	//replaced branch(EMSE:ADD_MECH_FEES)
	aDD_MECH_FEES();
}
if (AInfo['Plumbing'] == 'Yes') {

	//replaced branch(EMSE:ADD_PLUMB_FEES)
	aDD_PLUMB_FEES();
}
aa.runScript('BESO_PAGEFLOW_COPYBUILDINGINFO');
showMessage = true;
//branch('BESO_PAGEFLOW_COPYBUILDINGINFO ');
if (AInfo['Permit Type'] == 'PermitPermit') {

	//replaced branch(EMSE:SET_AppName)
	sET_AppName();
}
