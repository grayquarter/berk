
cancelFlag = false;
if (matches(wfTask, 'PSC Review') && matches(AInfo['Type of Work'], 'EV Charging', 'Solar PV') && balanceDue > 0) {
	showMessage = true;
	comment('<font size = 4 color=ff000><b>Balance Due:</b></font><br><br>There is a balance due of $' + balanceDue + ' for this Building Permit.  It cannot be issued until all fees are paid.<br>');
	cancel = true;
}
if (matches(wfTask, 'Issuance') && matches(wfStatus, 'Issued', 'Re-Issue') && balanceDue > 0) {
	showMessage = true;
	comment('<font size = 4 color=ff000><b>Balance Due:</b></font><br><br>There is a balance due of $' + balanceDue + ' for this Building Permit.  It cannot be issued until all fees are paid.<br>');
	cancel = true;
}
if (matches(wfTask, 'Issuance') && matches(wfStatus, 'Issued', 'Re-Issue') && feeGetTotByDateRange(dateAdd(null, -365), dateAdd(null, 0), 'NEW') > 0) {
	showMessage = true;
	comment('<font size = 4 color=ff000><b>Assessed Fees:</b></font><br><br>There are uninvoiced assessed fees in the amount of $' + feeGetTotByDateRange(dateAdd(null, -730), dateAdd(null, 0), 'NEW') + ' for this Building Permit.  The permit cannot be issued until the fees are assessed and paid.<br>');
	cancel = true;
}
if (matches(wfTask, 'Consolidated Comments') && matches(wfStatus, 'Ready To Issue')) {

	//start replaced branch: EMSE:CHECK_CORRECTIONS
	{
		if (isTaskStatus('Fire Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Building and Safety Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Planning Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Environment Health Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Landmarks Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Public Works Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Traffic Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Toxics Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Energy Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Zoning Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('Design Review', 'Corrections')) {
			cancelFlag = true;
		}
		if (isTaskStatus('PSC Review', 'Corrections')) {
			cancelFlag = true;
		}

	}
	//end replaced branch: EMSE:CHECK_CORRECTIONS;
}
if (cancelFlag == true) {
	showMessage = true;
	comment('<font size = 4 color=ff000><b>Corrections on Plan Check:</b></font><br><br>One or more plan check reviews has a last status of Corrections for this Permit.  It cannot be issued until all reviews have been approved.<br>');
	cancel = true;
}
