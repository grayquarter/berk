
if (wfTask == ('License Issuance') && wfStatus == ('Approved') && balanceDue > 0) {
 showMessage = true;
 cancel = true;
 comment('Cannot use Approved status with a balance greater than zero. Use Payment Pending or Deliqnuent.');
 }
if (wfTask == ('License Issuance') && wfStatus == ('Delinquent') && balanceDue <= 0) {
 showMessage = true;
 cancel = true;
 comment('Cannot use Delinquent status with no outstanding balance.');
 }
if (wfTask == ('License Issuance') && wfStatus == ('Payment Pending') && balanceDue <= 0) {
 showMessage = true;
 cancel = true;
 comment('Cannot use Payment Pending status with no outstanding balance.');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == null)) {
 showDebug = false;
 showMessage = true;
 cancel = true;
 comment('<font color=red><font size=small><b>MISSING FIELD VALUE</font></b></font><br><br>Cannot complete workflow until the Cannabis Business Type field has a valid value<br><br>');
 }

