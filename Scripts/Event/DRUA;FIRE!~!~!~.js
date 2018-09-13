
if (!matches(status,'',null) && wfTask != null && isTaskActive(wfTask)) {
 logDebug('Plan Review Status = ' + status);
 docReviewStatusStdChoice = 'Plan Review Document Review Status';
 logDebug('Call function updatePlanReviewWorkflow');
 updatePlanReviewWorkflow(taskName,status,taskReviewComments,'W');
 }

