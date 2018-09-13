
if (/*This got merged with EMSE:AddOnlineFees, so it's turned off. (Joao Sousa 10/26/2015)*/) {}
if (estValue != AInfo['Valuation']) {
	updateValFlag = true;
	comment('asa Job Value = ' + estValue);
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

//start replaced branch: EMSE:AddOnlineFees
{
	var totalFee = 0.00;
	var varSpecialFees = '';
	var varcount = 0;
	var specFeeCodes = new Array();
	var Est = 0;
	feeQty = 1;
	var worktype = '';
	var specFeeCodes = new Array();
	var varSpecialFees;
	var varLookupTable = 'Building Permit Fees';
	var subType = 'Residential' + '|' + AInfo['Type of Work'];
	var varFeeSched = 'B_BLDG';
	var varLkupCrit = 'Standard';
	removeFees('FE119,FE120,FM121,FM210,FM122,FM121,FB100,FB116,FB123,FB124,FB200,F100,F110,F120,F150,F160,F170,F280,F190,F200,F210');
	if (AInfo['Type of Work'] == 'Water Heater') {
		worktype = 'Plumbing';
		//updateFee('FB100ACA','B_PLUMB','FINAL',1,'N');
		totalFee = totalFee + feeAmount('FB100ACA');
	}
	if (AInfo['Type of Work'] == 'EV Charging') {
		worktype = 'Electrical';
		//updateFee('FE119','B_ELEC','FINAL',1,'N');
		updateFee('FE120', 'B_ELEC', 'FINAL', 1, 'N');
		updateFee('FE191', 'B_ELEC', 'FINAL', 1, 'N');
	}
	if (AInfo['Type of Work'] == 'Seismic Gas Shut-Off Valve') {
		worktype = 'Plumbing';
		//updateFee('FB116ACA','B_PLUMB','FINAL',1,'N');
		updateFee('FB124', 'B_PLUMB', 'FINAL', 1, 'N');
		updateFee('FB200', 'B_PLUMB', 'FINAL', 1, 'N');
	}
	if (AInfo['Type of Work'] == 'HVAC') {
		worktype = 'Mechanical';
		updateFee('FM121', 'B_MECH', 'FINAL', 1, 'N');
		updateFee('FM210', 'B_MECH', 'FINAL', 1, 'N');
		updateFee('FM122', 'B_MECH', 'FINAL', 1, 'N');
	}
	if (AInfo['Type of Work'] == 'Re-roof') {
		worktype = 'Building';
		Est = parseInt(AInfo['Valuation']);
	}
	if (AInfo['Type of Work'] == 'Solar') {
		worktype = 'Electrical';
		//updateFee('FE119','B_ELEC','FINAL',1,'N');
		updateFee('FE120', 'B_ELEC', 'FINAL', 1, 'N');
		updateFee('FE191', 'B_ELEC', 'FINAL', 1, 'N');
	}
	if (worktype == 'Electrical' && totalFee > 100 && AInfo['Work Type'] != 'Solar') {
		removeFee('FE119', 'FINAL');
		updateFee('FE191', 'B_ELEC', 'FINAL', 1, 'N');
		updateFee('FE120', 'B_ELEC', 'FINAL', 1, 'N');
		totalFee = totalFee + feeAmount('FE120');
	}
	if (worktype == 'Mechanical' && totalFee <= 100) {
		//removeFee('FM107');
		updateFee('FE119', 'B_MECH', 'FINAL', 1, 'N');
		updateFee('FM210', 'B_MECH', 'FINAL', 100, 'N');
		updateFee('FM122', 'B_MECH', 'FINAL', 1, 'N');
	}
	if (worktype == 'Mechanical' && totalFee > 100) {
		removeFee('FM121', 'FINAL');
		updateFee('FM122', 'B_MECH', 'FINAL', 1, 'N');
		totalFee = totalFee + feeAmount('FM122');
		updateFee('FM210', 'B_MECH', 'FINAL', totalFee, 'N');
	}
	if (worktype == 'Plumbing' && totalFee <= 100) {
		removeFee('FB100ACA');
		removeFee('FB116ACA');
		updateFee('FB123', 'B_PLUMB', 'FINAL', 1, 'N');
		updateFee('FB124', 'B_PLUMB', 'FINAL', 1, 'N');
		updateFee('FB200', 'B_PLUMB', 'FINAL', 1, 'N');
	}
	if (worktype == 'Building') {
		varSpecialFees = lookup(varLookupTable, 'Standard|Residential|Minor');
	}
	if (worktype == 'Building') {
		specFeeCodes = varSpecialFees.split(',');
		var thisCode = '';
		//for(thisCode in specFeeCodes )
		//replaced branch(EMSE:FLAG_FEES_SCHEDULES)
		fLAG_FEES_SCHEDULES();
	}
	if (worktype == 'Building') {
		for (thisCode in specFeeCodes)
			updateFee(specFeeCodes[thisCode], 'B_BLDG', 'FINAL', 1, 'N');
	}
	if (worktype == 'Building') {
		updateFee('F120', 'B_BLDG', 'FINAL', 1, 'N');
		//
		//start replaced branch: EMSE:SetOnlineNotesAndNames
		{
			subType = AInfo['Type of Work'] + ' | ' + 'via ACA';
			if (subType != null) {
				updateShortNotes(subType);
			}
			permitName = 'No Plan Review: ' + AInfo['Type of Work'] + ' Permit';
			editAppName(permitName);

		}
		//end replaced branch: EMSE:SetOnlineNotesAndNames;
	}
	subType = 'Residential | ' + AInfo['Type of Work'] + ' | 0';
	if (subType != null) {
		updateShortNotes(subType);
	}
	permitName = worktype + ' Permit';
	editAppName(permitName);
	editAppSpecific(AInfo['Plan Check Type'], 'Standard');
	editPriority('Standard');
	logDebug(' work type is:  ' + worktype);
	logDebug('minor permit totalFee is:  ' + totalFee);

}
//end replaced branch: EMSE:AddOnlineFees;
//publicUser;
createCapComment('ASA fired: ' + new Date());
