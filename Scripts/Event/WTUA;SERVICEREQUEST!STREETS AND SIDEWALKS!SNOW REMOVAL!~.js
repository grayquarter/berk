
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'AMS';
 newAppL2 = 'Public Works';
 newAppL3 = 'Streets';
 newAppL4 = 'Snow Removal';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

