
if (wfTask == 'Enforcement' && matches(wfStatus,'Inspection Warrant','Notice of Violation','Notice of Violation - 1st')) {
 
//start replaced branch: EMSE:SCHEDULE_HOUSE_INSP
 {
var tsiArray = new Array();
loadTaskSpecific(tsiArray,capId);
for (thisTSI in tsiArray) logDebug('Element: ' + thisTSI + '. Value: ' + tsiArray[thisTSI]);
tsDate = tsiArray['Inspection Date'];
logDebug('Inspection Date is:  ' + tsDate);
if (tsDate != null) {
 scheduleInspectDate('Re-inspection',tsDate,currentUserID,null,'Inspection Scheduled');
 }

}
//end replaced branch: EMSE:SCHEDULE_HOUSE_INSP;
 }

