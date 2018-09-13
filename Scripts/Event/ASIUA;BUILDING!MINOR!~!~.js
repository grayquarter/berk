
if (estValue != AInfo['Valuation']) {
	updateValFlag = true;
	comment('Job Value = ' + estValue);
} else {
	updateValFlag = false;
}
if (updateValFlag) {
	aa.finance.reCalculateFees(capId, 'CONT', AInfo['Valuation']);
}
if (updateValFlag) {
	newTblArray = new Array();
	newRowArray = new Array();
}
if (updateValFlag) {
	newRowArray['Valuation'] = String(getAppSpecific('Valuation'));
	newRowArray['Date'] = dateAdd(null, 0);
	newRowArray['Updated By'] = String(currentUserID);
}
if (typeof(VALUATIONHISTORY) != 'object' && updateValFlag) {
	newTblArray.push(newRowArray);
	addASITable('VALUATION HISTORY', newTblArray);
}
if (typeof(VALUATIONHISTORY) == 'object' && updateValFlag) {
	addToASITable('VALUATION HISTORY', newRowArray);
}
if (false) {
	/* End of valuation history update */
;
}
