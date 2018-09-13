
var licCapId=null;
var prjArr = null;
var childArr = null;
var delinquentSibling = false;
if (appMatch('Licenses/Business/*/Renewal')) {
 var prjArrRes=aa.cap.getProjectByChildCapID(capId,'Renewal', null);
 if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
 }
if (prjArr != null) {
 for(prj in prjArr) if(appMatch('*/*/*/License',prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
 }
if (licCapId != null) {
 licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
 }
if (licCapId != null) {
 childArrRes = new Array();
 childArrRes = aa.cap.getProjectByMasterID(licCapId, 'Renewal', null);
 if (childArrRes.getSuccess()) childArr=childArrRes.getOutput();
 }
if (childArr.length >0) {
 for(count in childArr) comment('Sibling: ' + count+ ' '+ childArr[count].getCapID() + ' Status: ' + aa.cap.getCap(childArr[count].getCapID().getID1(),childArr[count].getCapID().getID2(),childArr[count].getCapID().getID3()).getOutput().getCapStatus());
 }
if (childArr.length >0) {
 for(ct in childArr) if(matches(aa.cap.getCap(capId).getOutput().getCapID(), aa.cap.getCap(childArr[ct].getCapID()).getOutput().getCapID())) comment('This CapID is ' + aa.cap.getCap(capId).getOutput().getCapID() + ' My CapID is ' + aa.cap.getCap(childArr[ct].getCapID()).getOutput().getCapID());
 }
comment('DelinquentSiblings?: ' + delinquentSibling);
cancel=true;

