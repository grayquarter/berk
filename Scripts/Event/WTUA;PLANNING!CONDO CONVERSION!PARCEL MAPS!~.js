
if (wfTask == 'Deliver Completed Documents' & matches(wfStatus, 'Completed')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Deliver Completed Documents' & matches(wfStatus, 'Completed')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Closed','Closed by EMSE','');
 }
if (matches(wfTask,'Documents Acceptable','Completeness Review')&& wfStatus == 'Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Documents Acceptable','Completeness Review')&& wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }

