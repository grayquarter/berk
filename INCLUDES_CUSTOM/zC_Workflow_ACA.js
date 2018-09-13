function zC_Workflow_ACA() {

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
 closeTask('Zoning Review','Approved','Closed via Script û Zoning Review Approved','');
 //capId = holdId;
 }
if (blaAppName != null && pId != null) {
 asiToxics = getAppSpecific('HazMat', capId);
 comment(asiToxics);
 }
if (blaAppName != null && pId != null) {
 asiTobacco = getAppSpecific('Tobacco',capId);
 comment(asiTobacco);
 }
if (blaAppName != null && pId != null) {
 asiTattoo = getAppSpecific('Tattoo',capId);
 comment(asiTattoo);
 }
if (blaAppName != null && pId != null) {
 asiSwimPool = getAppSpecific('SwimPool',capId);
 comment(asiSwimPool);
 }
if (blaAppName != null && pId != null && asiToxics =='No') {
 setTask('Toxics Review','N','N');
 }
if (blaAppName != null && pId != null && asiTobacco =='No' && asiTattoo == 'No' && asiSwimPool == 'No') {
 setTask('Health Review','N','N');
 capId = holdId;
 }

}
