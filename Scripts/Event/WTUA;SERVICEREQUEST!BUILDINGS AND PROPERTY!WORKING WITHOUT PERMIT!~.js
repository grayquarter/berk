
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'Enforcement';
 newAppL2 = 'Incident';
 newAppL3 = 'Building';
 newAppL4 = 'Working Without Permit';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

