
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'AMS';
 newAppL2 = 'Water';
 newAppL3 = 'Fire Hydrant';
 newAppL4 = 'Repair';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

