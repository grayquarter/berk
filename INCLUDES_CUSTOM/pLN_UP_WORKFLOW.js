function pLN_UP_WORKFLOW() {

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
if (wfTask == 'Design Review' && wfStatus == 'DRC Required') {
 childId = createChild('Planning','Design Review','Committee','Preliminary','Created from '+ capIDString);
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
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','Y','PLN_UP_SRSP');
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
