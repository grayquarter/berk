function maskId() {

var searchCap = capId;
var tmpId = capId;
var prjArr = null;
if (appMatch('*/*/*/License')) {
 var childArr = getChildren('*/*/*/Application');
 if(childArr != null) searchCap = childArr[0];
 }
capId = tmpId;
var vRelationType = 'R';
if(appMatch('*/*/*/Renewal')) vRelationType='Renewal';
var prjArrRes = aa.cap.getProjectByChildCapID(searchCap,vRelationType,null);
if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
if (prjArr != null) {
 for(prj in prjArr) if(appMatch('*/*/*/License',prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
 }
if (licCapId == null && appMatch('*/*/*/License')) {
 licCapId = capId;
 //In the event license has no application;
 }
if (licCapId != null) {
 licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
 logDebug('Got Lic Cap ' + licCapId.getCustomID());
 }
var capIDshow = licCapId.getCustomID();
logDebug('capIDshow = ' + licCapId.getCustomID());
newAltId = '';
newAltId = 'BLR-' + (parseInt(AInfo['RenewYear']) + parseInt(1)) + '-' + capIDshow.substring(3);
logDebug('new AltID = ' + 'BLR-' + (parseInt(AInfo['RenewYear']) + parseInt(1)) + '-' + capIDshow.substring(3));
aa.cap.updateCapAltID(capId,newAltId);

}
