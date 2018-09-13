
if (cap.isCreatedByACA() && appMatch('Planning/Zoning Certificate/*/*')) {
 closeTask('Completeness Review','Complete','Closed by EMSE','');
 closeTask('Zoning Certificate','Meets Zoning Requirements','Closed by Online Approval','');
 closeTask('Case Closed','Approved','Closed by Online Approval','');
 }
if (AInfo['blaNum'] != null) {
 
//replaced branch(EMSE:ZC_Workflow_ACA)
zC_Workflow_ACA();
 }
if (cap.isCreatedByACA() && AInfo['blaNum'] != null) {
 addParent(AInfo['blaNum']);
 }

