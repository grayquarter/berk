
if (wfTask == 'Complaint Intake' && wfStatus == 'Assigned') {
 newAppL1 = 'Enforcement';
 newAppL2 = 'Incident';
 newAppL3 = 'Abatement';
 newAppL4 = 'Animal Nuisance';
 newAppDesc = 'Created by ' + capId.getCustomID();
 
//replaced branch(SR Create Child Cases)
createChildCases();
 }

