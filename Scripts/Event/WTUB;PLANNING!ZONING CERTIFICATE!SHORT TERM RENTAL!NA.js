
if (!(currentUserGroup == 'LandUseSupervisors' || currentUserGroup == 'PlanningAdmin' || currentUserGroup == 'STR_RentBoardSupervisor')  && wfStatus == 'Revoked') {
 showMessage = true;
 comment('<font size = 4 color=ff000><br><b>User is not allowed to perform this task.</b><br>');
 cancel = true;
 }

