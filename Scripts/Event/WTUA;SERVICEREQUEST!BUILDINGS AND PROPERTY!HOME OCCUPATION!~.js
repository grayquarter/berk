
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'Enforcement';
 newAppL2 = 'Incident';
 newAppL3 = 'Zoning';
 newAppL4 = 'Home Occupation';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

