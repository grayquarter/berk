
licCapId=null;
var prjArr = null;
var licCapStatus = null;
if (appMatch('Licenses/Business/*/Renewal')) {
 var prjArrRes=aa.cap.getProjectByChildCapID(capId,'Renewal', null);
 if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
 }
if (prjArr != null) {
 for(prj in prjArr) if(appMatch('*/*/*/License',prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
 }
if (licCapId != null) {
 licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
 licCapStatus=aa.cap.getCap(licCapId).getOutput().getCapStatus();
 }
logDebug('License record : ' + licCapId.getCustomID());
parentLic = getParentCapIDForIncomplete(capId);
parentLicenseCAPID = null;
logDebug(parentLic);
if (parentLic) {
 pLicArray = String(parentLic).split('-');
 var parentLicenseCAPID = aa.cap.getCapID(pLicArray[0],pLicArray[1],pLicArray[2]).getOutput();
 }
if (getAppSpecific('ClosureDate', capId) != null && licCapId != null && balanceDue == 0) {
 updateAppStatus('Closed', 'ClosureDate - Updated by PRA script', capId);
 updateAppStatus('Closed', 'Renewal ClosureDate - Updated by PRA script', licCapId);
 taskCloseAllExcept('Closed', 'ClosureDate - Updated by PRA script');
 exitExpirationStatus(capId,'Closed');
 }
if (getAppSpecific('ClosureDate', capId) != null && licCapId != null && balanceDue > 0) {
 updateAppStatus('Delinquent', 'Closure with Balance Due - Updated by PRA script', capId);
 updateAppStatus('Delinquent', 'Closure with Balance Due - Updated by PRA script', licCapId);
 taskCloseAllExcept('Delinquent', 'Closure with Balance Due - Updated by PRA script');
 licObj = new licenseObject(null, licCapId);
 if (licObj) licObj.setStatus('Delinquent');
 exitExpirationStatus(capId,'Delinquent');
 }
comment('full payment - update WF - '+ balanceDue +' on '+ getAppSpecific('Postmark', capId));
var checkSiblings = false;
var childBalanceDue = 0;
if ((isTaskActive('License Issuance')) && getAppSpecific('ClosureDate', capId) == null && balanceDue <=0) {
 checkSiblings = true;
 closeTask('License Issuance', 'Approved', 'Renewal Full Pay - Updated by PRA:License/Business/*/Renewal');
 var pCapId = getParentLicenseCapID(capId);
 updateAppStatus('Active','Renewal Full Pay - Updated by PRA:License/Business/*/Renewal', pCapId);
 copyContacts(capId, pCapId);
 copyAppSpecific(pCapId);
 exitExpirationStatus(capId,'Active');
 }
if (checkSiblings) {
 childBalanceDue = getRenewalBalance(pCapId);
 }
if (checkSiblings && childBalanceDue <= 0) {
 updateAppStatus('Active','Renewal Full Pay - Updated by PRA:License/Business/*/Renewal', pCapId);
 }
var cCapId = capId.getCustomID();
var capIdSplitArr = cCapId.toString().split('-');
var capYear = capIdSplitArr[1];
logDebug('capYear: ' + capYear);
var newExpDate = dateFormatted('12','31',capYear);
logDebug('newExpDate: ' + newExpDate);
var pCapId = getParentLicenseCapID(capId);
licObj = new licenseObject(null, pCapId);
if (licObj) licObj.setStatus('Active');
licObj.setExpiration(newExpDate);
setRenewalProjectComplete();
if (getAppSpecific('ClosureDate', capId) == null && balanceDue > 0) {
 updateAppStatus('Delinquent', 'Renewal with Balance Due - Updated by PRA script 122', capId);
 updateAppStatus('Delinquent', 'Renewal with Balance Due - Updated by PRA script 122', licCapId);
 licObj = new licenseObject(null, licCapId);
 if (licObj) licObj.setStatus('Delinquent');
 }

