
varCloseAll = false;
if (typeof(wfStatus) == 'undefined') {
	var wfStatus = 'Plan Distribution';
	var rFlag = 'I';
}
if (matches(wfStatus, 'Cancelled')) {
	updateAppStatus('Closed-Cancelled', wfStatus + ' at ' + wfTask);
	taskCloseAllSubExcept(wfStatus, wfStatus + ' at ' + wfTask);
	varCloseAll = true;
}
if (matches(wfTask, 'Issuance') && wfStatus == 'Issued') {
	editAppSpecific('Permit Expiration Date', dateAdd(null, 365));
}
if (matches(wfTask, 'Issuance') && wfStatus == 'Issued' && (getAppSpecific('Issue Date') == null || getAppSpecific('Issue Date') == '')) {
	editAppSpecific('Issue Date', dateAdd(null, 0));
}
if (matches(wfTask, 'Application Submittal') && wfStatus == 'Plan Distribution') {
	rFlag = 'I';
	todaysDate = dateAdd(null, 0, 'N');
	editAppSpecific('hidden_PlanCheckGoal', getAppSpecific('Plan Check Goal') + '-' + todaysDate);
	editAppSpecific('Submittal Date', todaysDate);
}
if (matches(wfTask, 'Building and Safety Review') && matches(AInfo['Type of Work'], 'EV Charging', 'Solar PV')) {
	updateFee('FE119', 'B_ELEC', 'FINAL', 1, 'N');
	updateFee('FE191', 'B_ELEC', 'FINAL', 1, 'N');
	updateFee('FE120', 'B_ELEC', 'FINAL', 1, 'N');
}
if (matches(wfTask, 'Building and Safety Review') && matches(AInfo['Type of Work'], 'EV Charging', 'Solar PV')) {
	invoiceFee('FE119', 'FINAL');
	invoiceFee('FE191', 'FINAL');
	invoiceFee('FE120', 'FINAL');
}
if (matches(wfTask, 'Resubmittal-Revision') && wfStatus == 'Plan Distribution') {
	rFlag = 'R';
	todaysDate = dateAdd(null, 0, 'N');
	editAppSpecific('hidden_PlanCheckGoalRev', getAppSpecific('Plan Check Goal') + '-' + todaysDate);
	editAppSpecific('Resubmittal-Revision Date', todaysDate);
}
if (matches(wfTask, 'Submittal-Revision') && wfStatus == 'Route') {
	rFlag = 'R';
	todaysDate = dateAdd(null, 0, 'N');
	editAppSpecific('hidden_PlanCheckGoalRev', getAppSpecific('Plan Check Goal') + '-' + todaysDate);
	editAppSpecific('Resubmittal-Revision Date', todaysDate);
}
if (matches(wfTask, 'Consolidated Comments') && matches(wfStatus, 'Resubmittal 3', 'Resubmittal 3+')) {
	showMessage = true;
	comment('<font size = 4 color=ff000><b>Assess Additional Submittal Fee:</b></font><br><br>Please assess fees for 3rd and subsequent submittals.<br>');
}
if (matches(wfTask, 'Plan Distribution', 'Resubmittal-Revision', 'Submittal-Revision') && wfStatus == 'Route') {
	logDebug('Call function autoRouteReviews');
	autoRouteReviews('E', 'Y');
	processDocsForReview(new Array('PLANS', 'CONSTRUCTION PLANS'), new Array('PSC Review'));
}
if (matches(wfTask, 'Plan Distribution', 'Resubmittal-Revision', 'Submittal-Revision') && wfStatus == 'Route') {
	rFlag = 'I';
	if (isTaskStatus('Resubmittal-Revision', 'Plan Distribution'))
		rFlag = 'R';

	//replaced branch(EMSE:GET_PCHK_DAYS)
	gET_PCHK_DAYS();
}
if (wfTask == 'Consolidated Comments' && matches(wfStatus, 'Corrections List Issued', 'Ready To Issue')) {

	//replaced branch(EMSE:WTUA_CONTACT NOTIFICATION_PLAN CHECK COMPLETED)
	cONTACT NOTIFICATION_PLAN CHECK COMPLETED();
}
if (matches(wfTask, 'Plan Distribution') && AInfo['Traffic Review'] == 'Yes') {
	updateFee('F177', 'B_BLDG', 'FINAL', 1, 'N');
}
