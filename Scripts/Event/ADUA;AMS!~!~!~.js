
if (appAssignedStaff != null && isTaskActive('Work Order Assignment') && appMatch('AMS/SEWER/NA/NA')) {
	var enableDebugMode = false;
	var arrParams = new Array();
	arrParams.push('alternateId=' + capIDString);
	arrParams.push('taskDescription=' + encodeURIComponent('Work Order Assignment'));
	arrParams.push('disposition=' + encodeURIComponent('Assigned'));
	arrParams.push('recordBy=' + currentUserID);
	externalLaganWSCallForAssetManagementWTUA(arrParams, enableDebugMode);
}
if (appAssignedStaff != null && isTaskActive('Work Order Assignment')) {
	closeTask('Work Order Assignment', 'Assigned', 'Updated by Script-ApplicationDetailUpdateAfter', 'Updated by Script-ApplicationDetailUpdateAfter');
	if (appScheduledDate = null)
		editScheduledDate(dateAdd(null, 1));
	if (appMatch('AMS/SEWER/NA/NA'))
		updateTask('Work Order Tasks', 'In Progress', 'Updated by Script-ApplicationDetailUpdateAfter', 'Updated by Script-ApplicationDetailUpdateAfter');
}
