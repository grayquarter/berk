
if (false) {
 // get contact list object, then loop to find applicant and validate it's email field;
 }
var vContactResult = AInfo[''];
vContactAry = new Array();
vContactsExist = false;
var vContactResult = aa.people.getCapContactByCapID(capId);
if (vContactResult.getSuccess()) {
 vContactsExist = true;
 }
if (vContactsExist) {
 vContactAry = vContactResult.getOutput();
 logDebug(vContactResult.getOutput().getClass());
 showDebug=3;
 }
if (vContactsExist) {
 for ( yy in vContactAry ) branch('EMSE:ValidateApplicantEmail');
 }

