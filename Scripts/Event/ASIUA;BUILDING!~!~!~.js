
if (appTypeArray[1] != 'Pre-application') {
	subType = AInfo['Category'] + ' | ' + AInfo['Work Type'] + ' | ' + AInfo['Plan Check Goal'];
}
if (subType != null) {
	updateShortNotes(subType);
}
rFlag = 'I';
goalCheck = '';
newGoal = AInfo['Plan Check Goal'];
if (isTaskStatus('Resubmittal-Revision', 'Plan Distribution'))
	rFlag = 'R';
if (appTypeArray[1] == 'Revision or Deferred') {
	rFlag = 'R';
}
if (rFlag == 'R') {
	hiddenGoal = AInfo['hidden_PlanCheckGoalRev'];
} else {
	hiddenGoal = AInfo['hidden_PlanCheckGoal'];
}
if (hiddenGoal != null) {
	goalCheck = (hiddenGoal.split('-'))[0];
	logDebug('goalCheck = ' + goalCheck + '. newGoal = ' + newGoal);
}
if (goalCheck != '' && newGoal != null && newGoal != '' && parseInt(goalCheck) != parseInt(newGoal) && AInfo['PSC Plan Check Due Date'] != null) {

	//replaced branch(EMSE:GET_PCHK_DAYS)
	gET_PCHK_DAYS();
}
if (AInfo['Plan Check Type'] != null && AInfo['Plan Check Type'] != '') {
	editPriority(AInfo['Plan Check Type']);
}

//replaced branch(EMSE:ASIUA_BLD_EDIT CONST TYPE)
aSIUA_BLD_EDIT CONST TYPE();
