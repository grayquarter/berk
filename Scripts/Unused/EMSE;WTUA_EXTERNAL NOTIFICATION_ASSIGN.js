
jobValuation = '';
planCheckType = '';
/*documentModel = aa.document.getDocumentByPK(documentID).getOutput();
aa.print(documentModel);
*/;
var taskAssignmentName = lookup('EXTERNAL_REVIEWERS',taskAssignment);
/*aa.print*/logDebug('Task Assignment Details: ' + taskAssignmentName + ';
' + taskAssignment);
jobValuation = getAppSpecific('Job Valuation');
if(AInfo['Use Calculated Valuation'] == 'Yes') jobValuation = getAppSpecific('Calculated Valuation');
planCheckType = getAppSpecific('Plan Check Type');
emailSendFrom = 'noreply@cityofberkeley.info';
emailSendTo = taskAssignment;
emailStaffCC = '';
emailTemplate = 'WTUA_EXTERNAL NOTIFICATION_ASSIGN';
fileNames = [];
if (lookup('LOOKUP:ScriptResources','Environment') == 'UAT' || lookup('LOOKUP:ScriptResources','Environment') == 'DEV') {
 emailSendTo = 'rcarrillo@cityofberkeley.info';
 }
emailParameters = aa.util.newHashtable();
getRecordParams4Notification(emailParameters);
getPrimaryAddressLineParam4Notification(emailParameters);
contArray = getContactArray();
if (contArray !=null) for (eachCont in contArray) 
//replaced branch(EMSE:DRUA_GET CONTACT DETAILS)
gETCONTACTDETAILS();
addParameter(emailParameters,'$$assignedToName$$',taskAssignmentName);
addParameter(emailParameters,'$$docName$$',documentModel['docName']);
addParameter(emailParameters,'$$taskName$$',taskName);
addParameter(emailParameters,'$$taskReviewComments$$',taskReviewComments);
addParameter(emailParameters,'$$jobValuation$$',jobValuation);
addParameter(emailParameters,'$$planCheckType$$',planCheckType);
acaUrl = 'http://aca.cityofberkeley.info/Community';
getACARecordParam4Notification(emailParameters,acaUrl);
if (taskAssignment != null) {
 sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
 }

