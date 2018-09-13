
if (wfTask == 'Plan Distribution' && wfStatus == 'Route') {
 logDebug('Call function autoRouteReviews');
 autoRouteReviews('E','Y');
 processDocsForReview(new Array('PLANS','CONSTRUCTION PLANS'),new Array('PSC Review'));
 }
if (matches(wfTask,'Ready to Issue') && wfStatus == 'Issued') {
 editAppSpecific('Permit Expiration Date',dateAdd(null,180));
 }
if (matches(wfTask,'Ready to Issue') && wfStatus == 'Issued' && (getAppSpecific('Issue Date') == null || getAppSpecific('Issue Date') == '')) {
 editAppSpecific('Issue Date',dateAdd(null,0));
 }
if (wfTask == 'Plan Distribution' && wfStatus == 'Route') {
 var todaysDate = new Date();
 var addDays = 20;
 var dates = generateDueDate(todaysDate,addDays);
 editTaskDueDate('*',dates);
 }
if (matches(wfTask,'Plan Distribution') && AInfo['Traffic Review'] == 'Yes') {
 addFee('F177','B_BLDG','FINAL',.5,'N');
 }
if (matches(wfTask,'Plan Distribution') && AInfo['Surveyors Review'] == 'Yes') {
 addFee('FP1000','PWORKS','FINAL',1,'N');
 }

