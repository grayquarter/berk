
if (!matches(status,'',null) && wfTask != null && isTaskActive(wfTask)) {
 logDebug('Plan Review Status = ' + status);
 docReviewStatusStdChoice = 'Plan Review Document Review Status';
 logDebug('Call function updatePlanReviewWorkflow');
 updatePlanReviewWorkflow(taskName,status,taskReviewComments,'W');
 }
if (matches(status,'',null) && !matches(taskAssignment,null,'') && taskAssignment.indexOf('@') > 0) {
 
//replaced branch(EMSE:DRUA_CHECK_EXTERNAL_CONTACT)
chECK_EXTERNAL_CONTACT();
 if(capIDString != 'B2015-06041') 
//replaced branch(EMSE:DRUA_EXTERNAL NOTIFICATION_ASSIGN)
eXTERNALNOTIFICATION_ASSIGN();
 }

