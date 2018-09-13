
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'AMS';
 newAppL2 = 'Public Works';
 newAppL3 = 'Storm';
 newAppL4 = 'Inlet Cleaning';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

