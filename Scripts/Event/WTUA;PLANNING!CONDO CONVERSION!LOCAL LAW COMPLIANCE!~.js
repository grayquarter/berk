
if (matches(wfTask,'Site Inspection','Land Use Review','Fire Review','Public Works Review') && wfStatus == 'Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Site Inspection','Land Use Review','Fire Review','Public Works Review') && wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }
if (wfTask == 'Notice of Local Law Compliance' & matches(wfStatus, 'Issued','Denied')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Notice of Local Law Compliance' & wfStatus == 'Issued') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Approved','Closed by EMSE','');
 }
if (wfTask == 'Notice of Local Law Compliance' & wfStatus == 'Denied') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Denied','Closed by EMSE','');
 }

