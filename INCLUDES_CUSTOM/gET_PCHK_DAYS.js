function gET_PCHK_DAYS() {

var dates = '';
var PSCDates = '';
var todaysDate = dateAdd(null,0,'N');
/*the following is for debugging*///var wfStatus = 'Plan Distribution';
var rFlag= 'I';
logDebug('Todays date is:  '+todaysDate);
if (typeof(wfStatus) == 'undefined') {
 var wfStatus = 'Plan Distribution';
 var rFlag = 'I';
 if (isTaskStatus('Resubmittal-Revision','Plan Distribution')) rFlag = 'R';
 }
if (appTypeArray[1] == 'Revision or Deferred') {
 rFlag = 'R';
 }
if (rFlag == 'R') {
 var hiddenGoal = AInfo['hidden_PlanCheckGoalRev'];
 } else {
 var hiddenGoal = AInfo['hidden_PlanCheckGoal'];
 }
if (hiddenGoal != null) {
 todaysDate = (hiddenGoal.split('-'))[1];
 }
addDays = 0;
addPSCDays = 0;
pCheckType = getAppSpecific('Plan Check Goal')+rFlag;
if (AInfo['Plan Check Type'] == 'Accelerated') {
 pCheckType = pCheckType+'A';
 } else {
 pCheckType = pCheckType+'S';
 }
addDays = lookup('ES_LKUP_PLANCHECK_DATES',pCheckType);
pCheckTypePSC = pCheckType + 'PSC';
addPSCDays = lookup('ES_LKUP_PLANCHECK_DATES',pCheckTypePSC);
dates = generateDueDate(todaysDate, addDays);
editTaskDueDate('*',dates);
PSCDates = generateDueDate(todaysDate, addPSCDays);
logDebug('number of days to add:  '+addDays+' and PSC days is:  '+addPSCDays+' the due dates are: '+dates+' and '+PSCDates);
editAppSpecific('Plan Check Due Date',dates);
editAppSpecific('PSC Plan Check Due Date',PSCDates);
editScheduledDate(PSCDates);
editTaskDueDate('PSC Review',PSCDates);
if (rFlag == 'R') {
 editAppSpecific('hidden_PlanCheckGoalRev',getAppSpecific('Plan Check Goal')+'-'+todaysDate);
 } else {
 editAppSpecific('hidden_PlanCheckGoal',getAppSpecific('Plan Check Goal')+'-'+todaysDate);
 }

}
