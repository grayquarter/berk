
if (wfTask == 'Zoning Certificate' && matches(wfStatus,'Continuing legal use','New Use - Meets Zoning','Meets Zoning Requirements','Conforms with by-right ADU') && AInfo['blaNum'] != null) {
 
//replaced branch(EMSE:ZC_Workflow_ACA)
zC_Workflow_ACA();
 }
if (wfTask == 'Zoning Certificate' && matches(wfStatus, 'Prohibited Use', 'New Use - Requires AUP/UP','Not Allowed') && AInfo['blaNum'] != null) {
 
//start replaced branch: EMSE:ZC_Workflow_ACA_Not_Approved
 {
blaAppName = AInfo['blaNum'];
comment(blaAppName);
if (blaAppName != null) {
 pId = getApplication(blaAppName);
 //capId = pId;
 comment(pId);
 }
if (blaAppName != null && pId != null) {
 holdId=capId;
 capId = pId;
 comment(capId);
 closeTask('Zoning Review','Not Approved','Closed via Script û Zoning Review Approved','');
 //capId = holdId;
 }
if (blaAppName != null) {
 setTask('Health Review','N','N');
 setTask('Building Review','N','N');
 setTask('Fire Review','N','N');
 setTask('Toxics Review','N','N');
 setTask('Application Acceptance','Y','N');
 capId = holdId;
 }

}
//end replaced branch: EMSE:ZC_Workflow_ACA_Not_Approved;
 }
if (wfTask == 'Zoning Certificate' && matches(wfStatus,'Continuing legal use','New Use - Meets Zoning','Meets Zoning Requirements','Conforms with by-right ADU') && cap.isCreatedByACA() && AInfo['blaNum'] != null) {
 addParent(AInfo['blaNum']);
 }

