
var renYr = '12/31/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
var licCapId=null;
var prjArr = null;
var childArr = null;
var prjArrRes=aa.cap.getProjectByChildCapID(capId,'Renewal', null);
if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
if (prjArr != null) {
 for(prj in prjArr) if(appMatch('*/*/*/License',prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
 }
if (licCapId != null) {
 licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
 }
if (var parentLicObject = new licenseObject('',parentCapId);var parentExpStatus = parentLicObject.getStatus();) {
 }
if (ture) {
 renewalCapPrj = capId;
 comment('What is renewalCapPrj = ' + renewalCapPrj);
 renewalCapPrj.setStatus('Complete');
 aa.cap.updateProject(renewalCapPrj);
 }
licEditExpInfo('Inactive',null);
//Update BLR ExpStatus;
if (licCapId !=null) {
 holdId = capId;
 capId = licCapId;
 licEditExpInfo('Active',renYr);
 capId = holdId;
 // update BL ExpStatus;
 }

