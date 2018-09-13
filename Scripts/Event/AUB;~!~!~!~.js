
showDebug = false;
showMessage = false;
currentUserGroup = null;
var currentUserGroupObj = aa.userright.getUserRight('AMS', currentUserID).getOutput();
if (currentUserGroupObj)
	currentUserGroup = currentUserGroupObj.getGroupName();
if (!matches(currentUserGroup, 'EngineeringSewer')) {
	cancel = true;
	showMessage = true;
	comment('Only members of EngineeringSewer user group may update Asset details');
}
