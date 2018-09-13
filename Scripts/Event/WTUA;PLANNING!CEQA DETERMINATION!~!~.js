
pId = getParent();
comment(pId);
if (wfTask == 'Prepare Findings' && wfStatus == 'Mitigation Monitoring Program' && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('CEQA Determination','Completed','Closed via Script - Completed Mitigation Monitoring Program','');
 capId = holdId;
 }
if (matches(wfTask,'Prepare Initial Study','Notice of Preparation (EIR)','Prepare Draft EIR','Prepare Negative Declaration (EIR)','Notice of Completion','Public Notification','Prepare Final EIR','Prepare Findings','CEQA Notice of Determination','Case Closed') && wfStatus == 'Withdrawn'&& pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('CEQA Determination','Withdrawn','Closed via Script - Withdrawn','');
 capId = holdId;
 }
if (matches(wfTask,'Prepare Initial Study','Notice of Preparation (EIR)','Prepare Draft EIR','Prepare Negative Declaration','Notice of Completion (EIR)','Public Notification','Prepare Final EIR','Prepare Findings','CEQA Notice of Determination','Case Closed') && wfStatus == 'Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Prepare Initial Study','Notice of Preparation (EIR)','Prepare Draft EIR','Prepare Negative Declaration (EIR)','Notice of Completion','Public Notification','Prepare Final EIR','Prepare Findings','CEQA Notice of Determination','Case Closed') && wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }

