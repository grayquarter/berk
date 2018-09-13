
varLkupCrit = '';
valTotal = 0;
if (estValue != AInfo['Job Valuation']) {
	updateValFlag = true;
	comment('Job Value = ' + estValue);
} else {
	updateValFlag = false;
}
if (updateValFlag) {
	aa.finance.reCalculateFees(capId, 'CONT', AInfo['Job Valuation']);
}
if (updateValFlag) {
	newTblArray = new Array();
	newRowArray = new Array();
}
if (updateValFlag) {
	strValuation = '';
	if (String(getAppSpecific('Job Valuation')) == 'null')
		strValuation = '0';
	else
		strValuation = String(getAppSpecific('Job Valuation'));
}
if (updateValFlag) {
	newRowArray['Valuation'] = String(strValuation);
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
if (typeof(CALCULATEDVALUATION) == 'object') {
	valTotal = 0;
	for (thisrow in CALCULATEDVALUATION)
		//start replaced branch: EMSE:SUM_VAL_ROWS
	{
		bElement = CALCULATEDVALUATION[thisrow];
		valTotal = valTotal + parseFloat(bElement['Valuation']);

	}
	//end replaced branch: EMSE:SUM_VAL_ROWS;
}
if (valTotal > 0) {
	editAppSpecific('Calculated Valuation', valTotal.toFixed(2));
}
if (AInfo['Use Calculated Valuation'] == 'Yes' && valTotal > 0) {
	editAppSpecific('Job Valuation', AInfo['Calculated Valuation']);
	editAppSpecific('Use Calculated Valuation', 'No');
	updateValFlag = true;

	//start replaced branch: EMSE:UPDATE_VALUATION
	{
		aa.finance.reCalculateFees(capId, 'CONT', AInfo['Calculated Valuation']);
		newTblArray = new Array();
		newRowArray = new Array();
		newRowArray['Valuation'] = String(strValuation);
		newRowArray['Date'] = dateAdd(null, 0);
		newRowArray['Updated By'] = String(currentUserID);
		if (typeof(VALUATIONHISTORY) != 'object' && updateValFlag) {
			newTblArray.push(newRowArray);
			addASITable('VALUATION HISTORY', newTblArray);
		}
		if (typeof(VALUATIONHISTORY) == 'object' && updateValFlag) {
			addToASITable('VALUATION HISTORY', newRowArray);
		}

	}
	//end replaced branch: EMSE:UPDATE_VALUATION;
} else {
	editAppSpecific('Use Calculated Valuation', 'No');
}
if (AInfo['Application Extension'] != null && AInfo['Application Extension'] != '') {

	//start replaced branch: EMSE:UPDATE_EXPIRE
	{
		if (AInfo['Application Extension'] != AInfo['Plan Check Extension'] && AInfo['Application Extension'] != 'Additional Extensions') {
			currentPCX = getAppSpecific('Plan Review Expiration Date');
			editAppSpecific('Plan Review Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Application Extension Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Plan Check Extension', AInfo['Application Extension']);
		}
		if (AInfo['Application Extension'] == 'Additional Extensions' && AInfo['Application Extension'] != AInfo['Plan Check Extension']) {
			currentPCX = getAppSpecific('Plan Review Expiration Date');
			editAppSpecific('Plan Review Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Application Extension Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Plan Check Extension', AInfo['Application Extension']);
		}
		if (AInfo['Application Extension'] == 'Additional Extensions' && AInfo['Application Extension'] == AInfo['Plan Check Extension'] && AInfo['Application Additional Extension'] == 'Apply') {
			currentPCX = getAppSpecific('Plan Review Expiration Date');
			editAppSpecific('Plan Review Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Application Extension Expiration Date', dateAdd(currentPCX, 180));
			editAppSpecific('Plan Check Extension', AInfo['Application Extension']);
			editAppSpecific('Application Additional Extension', null);
		}

	}
	//end replaced branch: EMSE:UPDATE_EXPIRE;
}
if (AInfo['Permit Extension'] != null && AInfo['Permit Extension'] != '') {

	//start replaced branch: EMSE:UPDATE_PERMIT_EXPIRE
	{
		if (AInfo['Permit Extension'] != AInfo['Permit Extensions'] && AInfo['Permit Extension'] != 'Additional Extensions') {
			currentPCX = getAppSpecific('Permit Expiration Date');
			editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Expiration Extension Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
		}
		if (AInfo['Permit Extension'] == 'Additional Extensions' && AInfo['Permit Extension'] != AInfo['Permit Extensions']) {
			currentPCX = getAppSpecific('Permit Expiration Date');
			editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Expiration Extension Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
		}
		if (AInfo['Permit Extension'] == 'Additional Extensions' && AInfo['Permit Extension'] == AInfo['Permit Extensions'] && AInfo['Permit Additional Extension'] == 'Apply') {
			currentPCX = getAppSpecific('Permit Expiration Date');
			editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Expiration Extension Date', dateAdd(currentPCX, 365));
			editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
			editAppSpecific('Permit Additional Extension', null);
		}

	}
	//end replaced branch: EMSE:UPDATE_PERMIT_EXPIRE;
}
if (varLkupCrit.indexOf('/') > -1) {
	varLkupCrit = 'Standard|Commercial|Alteration';
}
if (matches(AInfo['Electrical Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Electrical';
	addSuffix = '-ELE';
	childType = AInfo['Electrical Plan Check'];
	editAppSpecific('Electrical Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Mechanical Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Mechanical';
	addSuffix = '-MEC';
	childType = AInfo['Mechanical Plan Check'];
	editAppSpecific('Mechanical Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Plumbing Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Plumbing';
	addSuffix = '-PLB';
	childType = AInfo['Plumbing Plan Check'];
	editAppSpecific('Plumbing Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Building Plan Check'], 'Revision')) {
	addType = 'Building';
	addSuffix = '-BLD';
	childType = AInfo['Building Plan Check'];
	editAppSpecific('Building Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Elevator Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Elevator';
	addSuffix = '-ELV';
	childType = AInfo['Elevator Plan Check'];
	editAppSpecific('Elevator Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Trusses Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Trusses';
	addSuffix = '-TRS';
	childType = AInfo['Trusses Plan Check'];
	editAppSpecific('Trusses Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Miscellaneous Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Miscellaneous';
	addSuffix = '-MSC';
	childType = AInfo['Miscellaneous Plan Check'];
	editAppSpecific('Miscellaneous Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Deferred T 24 Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'T24';
	addSuffix = '-T24';
	childType = AInfo['Deferred T 24 Plan Check'];
	editAppSpecific('Deferred T 24 Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Storage/Disp Racks Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Storage/Disp Racks';
	addSuffix = '-STR';
	childType = AInfo['Storage/Disp Racks Plan Check'];
	editAppSpecific('Storage/Disp Racks Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Storefront System Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Storefront System';
	addSuffix = '-STF';
	childType = AInfo['Storefront System Plan Check'];
	editAppSpecific('Storefront System Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (matches(AInfo['Stairs/Railings Plan Check'], 'Deferred Submittal', 'Revision')) {
	addType = 'Stairs/Railings';
	addSuffix = '-STA';
	childType = AInfo['Stairs/Railings Plan Check'];
	editAppSpecific('Stairs/Railings Plan Check', 'Plan Check Added');

	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (AInfo['Electrical'] == 'Yes' && AInfo['Use Component Total Cost Fee'] == 'Yes') {

	//replaced branch(EMSE:ADD_ELEC_FEES)
	aDD_ELEC_FEES();
}
if (AInfo['Electrical'] == 'Yes' && AInfo['Use Component Total Cost Fee'] == 'No') {

	//start replaced branch: EMSE:REMOVE_ELEC_FEES
	{
		removeElectricalFees();
		if (AInfo['Electrical 1% fee'] > 1000) {
			updateFee('FE123', 'B_ELEC', 'FINAL', AInfo['Electrical 1% fee'], 'N');
			removeFee('FE191', 'FINAL');
			var cost = feeAmount('FE123');
			updateFee('FE191', 'B_ELEC', 'FINAL', 1, 'N');
			updateFee('FE120', 'B_ELEC', 'FINAL', 1, 'N');
		}

	}
	//end replaced branch: EMSE:REMOVE_ELEC_FEES;
}
if (AInfo['Mechanical'] == 'Yes') {

	//replaced branch(EMSE:ADD_MECH_FEES)
	aDD_MECH_FEES();
}
if (AInfo['Plumbing'] == 'Yes') {

	//replaced branch(EMSE:ADD_PLUMB_FEES)
	aDD_PLUMB_FEES();
}

//replaced branch(EMSE:SET_AppName)
sET_AppName();
if (AInfo['Phased Project'] == 'Yes') {
	var varLookupTable = '';
	addType = 'Building';
	addSuffix = '-BLD';
	childType = AInfo['Plan Check for Building'];
	editAppSpecific('Plan Check for Building', 'Plan Check Added');
	//
	//start replaced branch: EMSE:CREATE_CHILD_PLANCHECK
	{
		recName = addType + ' ' + childType + ' for ' + capIDString;
		cCapId = createChild('Building', 'Revision or Deferred', 'NA', 'NA', recName);
		pCapId = capId;
		if (childType == 'Plan Check')
			childExt = addSuffix;
		else if (childType == 'Deferred Submittal')
			childExt = '-DEF';
		else
			childExt = '-REV';
		subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
		if (subType != null) {
			updateShortNotes(subType, cCapId);
		}
		copyAppSpecific(cCapId);
		editAppSpecific('Child Type', addType + ' ' + childType, cCapId);
		/* NEW version of line */
	;
		logDebug('Child Type is :' + childExt);
		childString = updateChildAltID2Digits(pCapId, cCapId, childExt);
		logDebug('Child AltID = ' + childString);

	}
	//end replaced branch: EMSE:CREATE_CHILD_PLANCHECK;
}
if (AInfo['Permit Type'] == 'PermitPermit') {

	//replaced branch(EMSE:SET_AppName)
	sET_AppName();
}
if (AInfo['Building'] == 'Yes') {
	varLookupTable = 'Building Permit Fees';
	subType = AInfo['Category'] + '|' + AInfo['Work Type'];
	varFeeSched = 'B_BLDG';
	appMatch('Building/Permit/NA/NA');
	varLkupCrit = 'Standard';
	varLkupCrit = varLkupCrit + '|' + subType;
	varLkupCrit = varLkupCrit.replace('/', '');
	logDebug('Lookup Criteria = ' + varLkupCrit);
}
if (varLkupCrit.indexOf('AdditionAlteration') > -1) {
	varLkupCrit = 'Standard|Commercial|Alteration';
	logDebug('Now Lookup Criteria = ' + varLkupCrit);
}
if (AInfo['Building'] == 'Yes') {
	varSpecialFees = '';
	varSpecialFees = lookup(varLookupTable, varLkupCrit);
}
if (AInfo['Building'] == 'Yes' && !publicUser && varSpecialFees != null) {
	specFeeCodes = new Array();
	specFeeCodes = varSpecialFees.split(',');
	logDebug('specFeeCodes  array has:  ' + specFeeCodes);
}
if (AInfo['Building'] == 'Yes' && !publicUser && varSpecialFees != null) {
	removeFees(varSpecialFees);
	for (thisCode in specFeeCodes)
		//replaced branch(EMSE:FLAG_FEES_SCHEDULES)
		fLAG_FEES_SCHEDULES();
}
if (AInfo['Building'] == 'Yes' && AInfo['Plan Check Type'] == 'Accelerated') {
	updateFee('F250', 'B_BLDG', 'Final', 1, 'N');
}
if (AInfo['Building'] == 'No') {
	varLookupTable = 'Building Permit Fees';
	subType = AInfo['Category'] + '|' + AInfo['Work Type'];
	varFeeSched = 'B_BLDG';
	appMatch('Building/Permit/NA/NA');
	varLkupCrit = 'Standard';
	varLkupCrit = varLkupCrit + '|' + subType;
	varLkupCrit = varLkupCrit.replace('/', '');
	logDebug('Lookup Criteria = ' + varLkupCrit);
}
if (AInfo['Building'] == 'No' && varLkupCrit.indexOf('AdditionAlteration') > -1) {
	varLkupCrit = 'Standard|Commercial|Alteration';
	logDebug('Now Lookup Criteria = ' + varLkupCrit);
}
if (AInfo['Building'] == 'No') {
	varSpecialFees = '';
	varSpecialFees = lookup(varLookupTable, varLkupCrit);
	removeFees(varSpecialFees);
}
if (AInfo['Electrical'] == 'No') {
	removeFees('FE119,F122,FE120,FE100,FE134,FE129,FE130,FE103,FE104,FE105,FE106,FE107,FE108,FE109,FE110,FE111,FE112,FE113,FE114,FE115,FE116,FE117,FE118,FE124,FE128,FE129,FE111,FE123,FE191');
}
if (AInfo['Mechanical'] == 'No') {
	removeFees('FM100,FM121,FM122,FM210,FM101,FM102,FM103,FM104,FM105,FM106,FM107,FM108,FM109,FM110,FM111,FM112,FM113,FM114,FM115,FM116,FM117,FM118,FM119,FM120,FM121');
}
if (AInfo['Plumbing'] == 'No') {
	removeFees('FB123,FB124,FB123,FB200,FB124,FB123,FB100,FB101,FB102,FB103,FB104,FB105,FB106,FB107,FB108,FB109,FB110,FB111,FB112,FB113,FB114,FB115,FB116,FB117,FB118,FB119,FB131,FB132,FB133,FB134,FB135,FB136,FB137,FB138,FB139,FB120,FB121,FB130');
}
