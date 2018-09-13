function disallowFinalWhenOpenRevision() {

disallowFinal = false;
arrChildRevCaps = null;
stringAltID = null;
arrChildRevCaps = getChildren('Building/Revision or Deferred/NA/NA', capId);
if (arrChildRevCaps != null) {
 for (recX in arrChildRevCaps) 
//start replaced branch: EMSE:DisallowFinalWhenOpenRevisionLoop
 {
var addAltID = false;
var revisionCapID = null;
var revisionCapScript = null;
var revisionCapScript = aa.cap.getCap(arrChildRevCaps[recX]).getOutput();
if (revisionCapScript) {
 revisionCapID = revisionCapScript.getCapID().getCustomID();
 if ( !matches(revisionCapScript.getCapStatus(),'Closed Cancelled','Closed Complete','Closed Error','Closed Expired','Expired','Finaled','Void','Issued')) var addAltID = true;
 }
if (addAltID) {
 disallowFinal = true;
 stringAltID = !stringAltID ? revisionCapID : stringAltID + ', ' + revisionCapID;
 }

}
//end replaced branch: EMSE:DisallowFinalWhenOpenRevisionLoop;
 }
if (disallowFinal) {
 logDebug('Cancelling transaction due to open revision or deferred submittal item.');
 cancel = true;
 showMessage = true;
 comment('Permit ' + capIDString + ' cannot be finaled when revision or deferred submittal items (' + stringAltID + ') are open and active.');
 }

}
