
if (// find out if this is a Revision, if so, branch to plan check assignment (EMSE:BLD_AssignRevPlanCheck)) {
 }
if (matches(wfTask,'Submittal-Revision')  && wfStatus == 'Notes') {
 var isRev=false;
 var altIDparts = [];
 altIDParts = capId.getCustomID().split('-');
 if (altIDParts[2].substring(0,3) == 'REV') isRev=true;
 }
if (matches(wfTask,'Submittal-Revision')  && wfStatus == 'Notes' && isRev) {
 branch('EMSE:BLD_AssignRevPlanCheck');
 }

