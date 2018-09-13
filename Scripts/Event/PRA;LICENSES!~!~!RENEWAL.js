
if (!(isTaskActive('License Issuance'))) {
 aa.runScript('PaymentReceiveAfter4Renew');
 }
if (!(isTaskActive('License Issuance')) && appMatch('Licenses/Business/*/Renewal') && getAppSpecific('ClosureDate', capId) != null && licCapId != null) {
 licObj = new licenseObject(null, licCapId);
 if (licObj) licObj.setStatus('Inactive');
 }
if (!(isTaskActive('License Issuance')) && balanceDue <=0) {
 var pCapId = '';
 var recordType='License Renewals';
 logDebug('CapID' + capId);
 var parentID = getParentCapID4Renewal(capId);
 logDebug('parentID' + parentID );
 addSetForRenew(recordType,parentID);
 }

