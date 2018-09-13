
var PostMarkDate = new Date(AInfo['Postmark']);
var RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
var RenewalDueDate = new Date(RenewalDueDateMMDDYY);
var DaysLate = parseInt((PostMarkDate - RenewalDueDate)/(24*60*60*1000));
if (DaysLate > 0) {
 var newStatus = 'Pending';
 }
if (DaysLate < 1) {
 var newStatus = 'Delinquent';
 }
var totalFeeBalance = feeBalance('LIC_BUS_REN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_REN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_PEN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_PEN2','LIC_BUSINESS_RENEWAL');
var licCapId=null;
var prjArr = null;
var prjArrRes=aa.cap.getProjectByChildCapID(capId,'Renewal', null);
if(prjArrRes.getSuccess()) prjArr = prjArrRes.getOutput();
if (prjArr != null) {
 for(prj in prjArr) if(appMatch('*/*/*/License',prjArr[prj].getProjectID())) licCapId = prjArr[prj].getProjectID();
 }
if (licCapId != null) {
 licCapId = aa.cap.getCapID(licCapId.getID1(),licCapId.getID2(),licCapId.getID3()).getOutput();
 }
var parentLicObject = new licenseObject('',licCapId);
var parentExpStatus = parentLicObject.getStatus();
comment('parent cap is: ' + licCapId + ' and expstatus is: ' + parentExpStatus);
if (totalFeeBalance > 0) {
 updateAppStatus(newStatus,'Updated by script (EMSE:LicMarkPartiallyPaidAsPendingDelinquent)', capId);
 licEditExpInfo(newStatus, null);
 comment('Updated ' + capId + ' to ' + newStatus);
 }
if (totalFeeBalance > 0 && parentExpStatus != 'Expired') {
 updateAppStatus(newStatus,'Updated by script (EMSE:LicMarkPartiallyPaidAsPendingDelinquent)',licCapId);
 var blrId=capId;
 capId=licCapId;
 licEditExpInfo(newStatus, null);
 capId=blrId;
 comment('Updated License' + licCapId.getCustomID() + ' to ' + newStatus);
 }
cancel=true;

