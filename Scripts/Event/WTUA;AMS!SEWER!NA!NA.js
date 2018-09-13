
if ((wfTask == 'Work Order Assignment' && matches(wfStatus, 'Assigned', 'Cancelled')) || (wfTask == 'Work Order Tasks' && matches(wfStatus, 'Field Work Completed', 'In Progress')) || (wfTask == 'Final Review and Assessment' && matches(wfStatus, 'Completed', 'Inspection Required', 'Cancellation Confirmed'))) {
 var tempShowMessage = showMessage;
 showMessage = true;
 var enableDebugMode = false;
 var arrParams = new Array();
 arrParams.push('alternateId=' + capIDString);
 arrParams.push('taskDescription=' + encodeURIComponent(wfTask));
 arrParams.push('disposition=' + encodeURIComponent(wfStatus));
 arrParams.push('recordBy=' + currentUserID);
 if(matches(wfTask, 'Work Order Assignment') && matches(wfStatus, 'Cancelled')) arrParams.push('branchToTask=' + encodeURIComponent('Final Review and Assessment'));
 if(matches(wfTask, 'Final Review and Assessment') && matches(wfStatus, 'Inspection Required')) arrParams.push('loopToTask=' + encodeURIComponent('Work Order Tasks'));
 externalLaganWSCallForAssetManagementWTUA(arrParams, enableDebugMode);
 showMessage = tempShowMessage;
 }

