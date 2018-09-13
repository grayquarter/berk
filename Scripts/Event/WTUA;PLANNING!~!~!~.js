
if (wfTask == 'Completeness Review' && wfStatus == 'Resubmittal Pending Staff') {
 editTaskDueDate('Completeness Review',dateAdd(null,30));
 }
if (wfTask == 'Completeness Review' && wfStatus == 'Application Complete') {
 PSADueDate=new Date(wfDateMMDDYYYY);
 PSADueDate.setDate(PSADueDate.getDate() + 60);
 editAppSpecific('PSADate', jsDateToASIDate(PSADueDate));
 comment('New PSA date: ' + PSADueDate+' , ' + AInfo['PSADate']);
 }
closeSubWorkflow(wfProcessID,'Completed');
if (appMatch('Planning/Administrative Use Permit/*/*')) {
 
//start replaced branch: EMSE:PLN_AUP_WORKFLOW
 {
if (wfTask == 'Completeness Review' && wfStatus == 'Application Complete') {
 deactivateTaskOnTSI('Completeness Review');
 }
if (wfTask == 'CEQA Determination' && wfStatus == 'Initial Study Required') {
 childId = createChild('Planning','CEQA Determination','NA','NA','Created from '+ capIDString);
 copyAddresses(capId,childId);
 copyContacts(capId,childId);
 copyLicensedProf(capId,childId);
 copyOwner(capId,childId);
 copyParcels(capId,childId);
 copyParcelGisObjects();
 updateAppStatus('Pending','',childId);
 }
if (wfTask == 'Landmarks Review' && wfStatus == 'Structural Alteration Permit') {
 childId = createChild('Planning','Landmarks','SAP','NA','Created from '+ capIDString);
 copyAddresses(capId,childId);
 copyContacts(capId,childId);
 copyLicensedProf(capId,childId);
 copyOwner(capId,childId);
 copyParcels(capId,childId);
 copyParcelGisObjects();
 updateAppStatus('Pending','',childId);
 }
if (wfTask == 'Design Review' && wfStatus == 'DRSL Required') {
 childId = createChild('Planning','Design Review','Staff Level','NA','Created from '+ capIDString);
 copyAddresses(capId,childId);
 copyContacts(capId,childId);
 copyLicensedProf(capId,childId);
 copyOwner(capId,childId);
 copyParcels(capId,childId);
 copyParcelGisObjects();
 updateAppStatus('Pending','',childId);
 }
if (wfTask == 'Report: Submit to Admin' && matches(wfStatus, 'Submitted','Review Not Required')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Report: Submit to Admin' && matches(wfStatus, 'Submitted','Review Not Required')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_AUP_SRSP');
 }
if (matches(wfTask,'Completeness Review','CEQA Determination','Landmarks Review','Design Review','Staff Report','Public Notification') && matches(wfStatus,'Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Completeness Review','CEQA Determination','Landmarks Review','Design Review','Staff Report','Public Notification') && matches(wfStatus,'Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 closeTask('ZAB Appeal Process','Appeal Withdrawn','ZAB 1st Meeting','updated by script');
 }
if (wfTask == 'ZAB 1st Meeting' && wfStatus == 'Appeal Denied') {
 closeTask('ZAB Appeal Process','Appeal Denied','ZAB 1st Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 1st Meeting') && wfStatus == 'Remanded') {
 loopTask('ZAB Appeal Process','Remanded','ZAB 1st Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 2nd Meeting') && wfStatus == 'Remanded') {
 loopTask('ZAB Appeal Process','Remanded','ZAB 2nd Meeting','updated by script');
 }
if (wfTask == 'ZAB 2nd Meeting' && wfStatus == 'Project Denied') {
 closeTask('ZAB Appeal Process','Project Denied','ZAB 2nd Meeting','updated by script');
 }
if (wfTask == 'ZAB 2nd Meeting' && wfStatus == 'Project Approved') {
 closeTask('ZAB Appeal Process','Project Approved','ZAB 2nd Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 setTask('Internal Review','N','N','PLN_ZABSR_SP');
 setTask('Legal Review','N','N','PLN_ZABSR_SP');
 setTask('Submit to Admin','N','N','PLN_ZABSR_SP');
 setTask('Internal Review','N','N','PLN_ZABSR_SP2');
 setTask('Legal Review','N','N','PLN_ZABSR_SP2');
 setTask('Submit to Admin','N','N','PLN_ZABSR_SP2');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 for (x in wfAsgnArray) if (x != 'Case Closed' && wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 closeTask('City Council Appeal Process','Appeal Withdrawn','City Council 1st Meeting','updated by script');
 }
if (wfTask == 'City Council 1st Meeting' && wfStatus == 'Appeal Denied') {
 closeTask('City Council Appeal Process','Appeal Denied','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 2nd Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 2nd Meeting','updated by script');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Denied') {
 closeTask('City Council Appeal Process','Project Denied','City Council 2nd Meeting','updated by script');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Approved') {
 closeTask('City Council Appeal Process','Project Approved','City Council 2nd Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 setTask('Internal Review','N','N','PLN_CCSR_SP');
 setTask('Legal Review','N','N','PLN_CCSR_SP');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP');
 setTask('Internal Review','N','N','PLN_CCSR_SP2');
 setTask('Legal Review','N','N','PLN_CCSR_SP2');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP2');
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Void','Denied','Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Void','Denied','Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP2');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_ZABSR_SP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_ZABSR_SP2');
 }

}
//end replaced branch: EMSE:PLN_AUP_WORKFLOW;
 }
if (appMatch('Planning/Use Permit/*/*')) {
 
//replaced branch(EMSE:PLN_UP_WORKFLOW)
pLN_UP_WORKFLOW();
 }
if (appMatch('Planning/Landmarks/*/*')) {
 
//start replaced branch: EMSE:PLN_LM_WORKFLOW
 {
if (wfTask == 'CEQA Determination' && wfStatus == 'Initial Study Required') {
 childId = createChild('Planning','CEQA Determination','NA','NA','Created from '+ capIDString);
 copyAddresses(capId,childId);
 copyContacts(capId,childId);
 copyLicensedProf(capId,childId);
 copyOwner(capId,childId);
 copyParcels(capId,childId);
 copyParcelGisObjects();
 updateAppStatus('Pending','',childId);
 }
if (matches(wfTask,'Completeness Review','LPC Staff Report','Public Notification') && matches(wfStatus,'Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Completeness Review','LPC Staff Report','Public Notification') && matches(wfStatus,'Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_LMSR_SP');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 closeTask('City Council Appeal Process','Appeal Withdrawn','City Council 1st Meeting','updated by script');
 }
if (wfTask == 'City Council 1st Meeting' && wfStatus == 'Appeal Denied') {
 closeTask('City Council Appeal Process','Appeal Denied','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 2nd Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 2nd Meeting','updated by script');
 setTask('Case Closed','N','N');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Denied') {
 closeTask('City Council Appeal Process','Project Denied','City Council 1st Meeting','updated by script');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Approved') {
 closeTask('City Council Appeal Process','Project Approved','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 setTask('Internal Review','N','N','PLN_CCSR_SP');
 setTask('Legal Review','N','N','PLN_CCSR_SP');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP');
 setTask('Internal Review','N','N','PLN_CCSR_SP2');
 setTask('Legal Review','N','N','PLN_CCSR_SP2');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP2');
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Approved with Changes','Denied','Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Approved with Changes','Denied','Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP2');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CC_SP');
 }

}
//end replaced branch: EMSE:PLN_LM_WORKFLOW;
 }
if (appMatch('Planning/Design Review/Committee/Preliminary')) {
 
//start replaced branch: EMSE:PLN_DRCP_WORKFLOW
 {
pId=getParent();
if (wfTask == 'DRC Meeting' && matches(wfStatus,'Approved','Approved with Changes') && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','DRC Approved','Closed via Script','');
 capId = holdId;
 }
if (wfTask == 'DRC Meeting' && wfStatus == 'Denied' && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','DRC Denied','Closed via Script','');
 capId = holdId;
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Staff Report') && wfStatus == 'Withdrawn' && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','Withdrawn','Closed via Script','');
 capId = holdId;
 }
if (wfTask == 'DRC Meeting' && matches(wfStatus,'Approved','Approved with Changes')) {
 closeTask('Case Closed','Approved','Closed via Script','');
 }
if (wfTask == 'DRC Meeting' && wfStatus == 'Denied') {
 closeTask('Case Closed','Denied','Closed via Script','');
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Staff Report') && wfStatus == 'Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Staff Report') && wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }

}
//end replaced branch: EMSE:PLN_DRCP_WORKFLOW;
 }
if (appMatch('Planning/Design Review/Staff Level/*')) {
 
//start replaced branch: EMSE:PLN_DRSL_WORKFLOW
 {
if (matches(wfTask,'Completeness Review','CEQA Determination','Landmarks Review','Design Review','DRSL Staff Report','Public Notification') && wfStatus =='Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Completeness Review','CEQA Determination','Landmarks Review','Design Review','DRSL Staff Report','Public Notification') && wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 closeTask('ZAB Appeal Process','Appeal Withdrawn','ZAB 1st Meeting','updated by script');
 }
if (wfTask == 'ZAB 1st Meeting' && wfStatus == 'Appeal Denied') {
 closeTask('ZAB Appeal Process','Appeal Denied','ZAB 1st Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 1st Meeting') && wfStatus == 'Remanded') {
 loopTask('ZAB Appeal Process','Remanded','ZAB 1st Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 2nd Meeting') && wfStatus == 'Remanded') {
 loopTask('ZAB Appeal Process','Remanded','ZAB 2nd Meeting','updated by script');
 }
if (wfTask == 'ZAB 2nd Meeting' && wfStatus == 'Project Denied') {
 closeTask('ZAB Appeal Process','Project Denied','ZAB 2nd Meeting','updated by script');
 }
if (wfTask == 'ZAB 2nd Meeting' && wfStatus == 'Project Approved') {
 closeTask('ZAB Appeal Process','Project Approved','ZAB 2nd Meeting','updated by script');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 setTask('Internal Review','N','N','PLN_ZABSR_SP');
 setTask('Legal Review','N','N','PLN_ZABSR_SP');
 setTask('Submit to Admin','N','N','PLN_ZABSR_SP');
 setTask('Internal Review','N','N','PLN_ZABSR_SP2');
 setTask('Legal Review','N','N','PLN_ZABSR_SP2');
 setTask('Submit to Admin','N','N','PLN_ZABSR_SP2');
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'ZAB 1st Meeting','ZAB Staff Report 1','ZAB Staff Report 2','ZAB 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 for (x in wfAsgnArray) if (x != 'Case Closed' && wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 closeTask('City Council Appeal Process','Appeal Withdrawn','City Council 1st Meeting','updated by script');
 }
if (wfTask == 'City Council 1st Meeting' && wfStatus == 'Appeal Denied') {
 closeTask('City Council Appeal Process','Appeal Denied','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 1st Meeting','updated by script');
 }
if (matches(wfTask,'City Council 2nd Meeting') && wfStatus == 'Remanded') {
 loopTask('City Council Appeal Process','Remanded','City Council 2nd Meeting','updated by script');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Denied') {
 closeTask('City Council Appeal Process','Project Denied','City Council 2nd Meeting','updated by script');
 }
if (wfTask == 'City Council 2nd Meeting' && wfStatus == 'Project Approved') {
 closeTask('City Council Appeal Process','Project Approved','City Council 2nd Meeting','updated by script');
 }
if (matches(wfTask,'City Council 1st Meeting','City Council Staff Report 1','City Council Staff Report 2','City Council 2nd Meeting') && wfStatus == 'Appeal Withdrawn') {
 setTask('Internal Review','N','N','PLN_CCSR_SP');
 setTask('Legal Review','N','N','PLN_CCSR_SP');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP');
 setTask('Internal Review','N','N','PLN_CCSR_SP2');
 setTask('Legal Review','N','N','PLN_CCSR_SP2');
 setTask('Submit to Clerk','N','N','PLN_CCSR_SP2');
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Void','Denied','Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Case Closed' && matches(wfStatus, 'Approved','Void','Denied','Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_CCSR_SP2');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_ZABSR_SP');
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_ZABSR_SP2');
 }

}
//end replaced branch: EMSE:PLN_DRSL_WORKFLOW;
 }
if (appMatch('Planning/Design Review/Committee/Final')) {
 
//start replaced branch: EMSE:PLN_DRCF_WORKFLOW
 {
if (wfTask == 'DRC Meeting' && matches(wfStatus,'Approved','Approved with Changes')) {
 closeTask('Case Closed','Approved','Closed via Script','');
 }
if (wfTask == 'DRC Meeting' && wfStatus == 'Denied') {
 closeTask('Case Closed','Denied','Closed via Script','');
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Staff Report') && wfStatus == 'Withdrawn') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Staff Report') && wfStatus == 'Withdrawn') {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }

}
//end replaced branch: EMSE:PLN_DRCF_WORKFLOW;
 }
if (appMatch('Planning/Zoning Certificate/*/*')) {
 
//start replaced branch: EMSE:PLN_ZC:AutoCloseWorkflow
 {
if (wfTask == 'Zoning Certificate' && matches(wfStatus, 'Prohibited Use', 'New Use - Requires AUP/UP','Not Allowed')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Zoning Certificate' && matches(wfStatus, 'Prohibited Use', 'New Use - Requires AUP/UP','Not Allowed')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Denied','Closed via Script','');
 }
if (wfTask == 'Zoning Certificate' && matches(wfStatus,'Continuing legal use','New Use - Meets Zoning','Meets Zoning Requirements','Conforms with by-right ADU','Provided Copy of Permit')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (wfTask == 'Zoning Certificate' && matches(wfStatus,'Continuing legal use','New Use - Meets Zoning','Meets Zoning Requirements','Conforms with by-right ADU','Provided Copy of Permit')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('Case Closed','Approved','Closed by EMSE','');
 }

}
//end replaced branch: EMSE:PLN_ZC:AutoCloseWorkflow;
 }
if (appMatch('Planning/Zoning Permit/*/*')) {
 
//start replaced branch: EMSE:PLN_ZP_WORKFLOW
 {
if (matches(wfTask,'Completeness Review','CEQA Determination','Staff Decision','Appeal','Hearing Notice','Public Hearing','Notice of Decision') && matches(wfStatus,'Withdrawn')) {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 }
if (matches(wfTask,'Completeness Review','CEQA Determination','Staff Decision','Appeal','Hearing Notice','Public Hearing','Notice of Decision') && matches(wfStatus,'Withdrawn')) {
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y');
 closeTask('Case Closed','Withdrawn','Closed by EMSE','');
 }

}
//end replaced branch: EMSE:PLN_ZP_WORKFLOW;
 }

